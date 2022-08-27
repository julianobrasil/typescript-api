import path from 'path';
import fs from 'fs';
import { createDirectoryIfNeeded } from './create-directory-if-needed';

export const generateFiles = (data: CamelCaseRichObject, generatedFilesBasePath: string) => {
    const filePath = `${generatedFilesBasePath}/${data.interface.file}.ts`;
    createDiffFile(generatedFilesBasePath, data);

    // Create or update the current file
    fs.writeFile(filePath, data.interface.camelCaselizedDefinition, function (err: NodeJS.ErrnoException | null) {
        if (err) {
            console.log(`Error while writing to ${data.interface.file}.ts`, err);
        }
    });
}

const createDiffFile = (baseDirectory: string, data: CamelCaseRichObject) => {
    const fileAbsolutePath = `${baseDirectory}/${data.interface.file}.ts`;
    if (fs.existsSync(fileAbsolutePath)) {
        const fileDiffs = findContentDiffs(fileAbsolutePath, data.interface.camelCaselizedDefinition);
        if (fileDiffs) {
            createDirectoryIfNeeded(path.join(baseDirectory, 'diffs'));
            const diffFilePath = path.resolve(path.join(baseDirectory, 'diffs', `${data.interface.file}.ts`));
            if (fs.existsSync(diffFilePath)) {
                fs.unlinkSync(diffFilePath);
            }
            fs.writeFileSync(diffFilePath, fileDiffs.oldFileContentWithDifferences, 'utf8');
            fs.unlinkSync(fileAbsolutePath);
        }
    }
}

const findContentDiffs = (filePath: string, fileContent: string) => {
    const oldContent = fs.readFileSync(filePath, 'utf8');
    const oldFileContentSplitted = oldContent.split(/\n/);
    const fileContentSplitted = fileContent.split(/\n/);
    const differences: FileDiffs = fileContentSplitted.map((line, i) => line === oldFileContentSplitted[i] ? null : {
        oldContent: oldFileContentSplitted[i],
        newContent: line,
        lineNumber: i + 1,
    }).filter(Boolean) as FileDiffs;

    const extraLinesOnOldFile = oldFileContentSplitted.length - fileContentSplitted.length;
    if (extraLinesOnOldFile > 0) {
        const start = fileContentSplitted.length + extraLinesOnOldFile - 1
        for (let i = start; i < oldFileContentSplitted.length; i++) {
            differences.push({
                oldContent: oldFileContentSplitted[i],
                newContent: undefined,
                lineNumber: i
            })
        }
    }

    differences.forEach((diff, i) => {
        if (diff!.lineNumber > oldFileContentSplitted.length || diff.oldContent === undefined) {
            oldFileContentSplitted.push(`// >>>>>>> changed to "${diff.newContent}"`)
        } else if(diff.newContent) {
            oldFileContentSplitted[diff!.lineNumber - 1] += ` // >>>>>>> changed to "${diff.newContent ?? ''}"`
        }
    })

    return differences.length ? {
        oldFileContentWithDifferences: oldFileContentSplitted.join('\n')
    } : null;
}
