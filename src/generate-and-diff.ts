import path from 'path';
import fs from 'fs';

export const generateAndDiff = (i: Interface) => {
    const filePath = path.resolve(path.join(__dirname, `${i.file}.ts`))
    const fileContent = fs.readFileSync(filePath, 'utf8');
}