import path from 'path';
import fs from 'fs';

export const generateAndDiff = (i: Interface) => {
    const filePath = path.resolve(path.join(__dirname, `${i.file}.ts`))
    if (fs.existsSync(filePath)) {
        const fileDiffs = findContentDiffs(filePath, i.definition);
        if (fileDiffs) {
            const diffFilePath = path.resolve(path.join(__dirname, 'diffs', `${i.file}.ts`));
            if(fs.existsSync(diffFilePath)) {
                fs.unlinkSync(diffFilePath);
            }
            fs.writeFileSync(diffFilePath, fileDiffs.oldFileContentWithDifferences, 'utf8');
            fs.unlinkSync(filePath);
        }
    }

    fs.writeFile(filePath, i.definition, function (err: NodeJS.ErrnoException | null) {
        console.log(`Error while writing to ${i.file}.ts`, err);
    });
}

const findContentDiffs = (filePath: string, fileContent: string) => {
    const oldContent = fs.readFileSync(filePath, 'utf8');
    const oldFileContentSplitted = oldContent.split(/\n/);
    const fileContentSplitted = fileContent.split(/\n/);
    const differences = fileContentSplitted.map((line, i) => line === oldFileContentSplitted[i] ? null : {
        oldContent: oldFileContentSplitted[i],
        newContent: line,
        lineNumber: i + 1,
    }).filter(Boolean);
    differences.forEach((diff) => {
        oldFileContentSplitted[diff!.lineNumber - 1] += `// <= changed to ${oldContent}`
    })
    return differences.length ? {
        oldFileContentWithDifferences: oldFileContentSplitted.join('\n')
    } : null;
}
