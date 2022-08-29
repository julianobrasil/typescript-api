import { findAndGroupFilesByType, findFilesByType, findFirstFileByType } from "./helpers/find-files-by-type";
import { toKebabCase } from "./to-kebab-case";

export const breakDownInterfacesObjects = (files: MigrationFile<FileType>[]): MigrationFile<FileType>[] => {
    const modelSource = findFirstFileByType('model-source', files);
    if (!modelSource) {
        throw new Error('No model file source was find');
    }
    const supportFiles = findAndGroupFilesByType('api-source', files, (file) => 'name' in file ? file.name! : '');

    const content = modelSource.content ?? '';
    const regex = /export ([a-z])+ [A-Z]([a-zA-Z0-9])+ {\n([\n\s\/*@a-zA-Z0-9?:;|"\[\]\}]|{(?!\n))+(}(?!;))/gm;
    const regexInterfaceName = /export interface ([a-zA-Z_0-9]+) {/
    let result: RegExpExecArray | null;
    while ((result = regex.exec(content)) !== null) {
        const content = result[0];
        const interfaceOrClassName = (regexInterfaceName.exec(content) ?? [])[1];
        const kebabCaseFileName = toKebabCase(interfaceOrClassName);
        let file: MigrationFile<'model' | 'api-client-model'>;
        if (`${interfaceOrClassName}.ts` in supportFiles) {
            file = {
                content,
                type: 'model',
                processedContent: {
                    kebabCaseFileName,
                    interfaceOrClassName
                }
            }
        } else {
            file = {
                content,
                type: 'api-client-model',
                processedContent: {
                    kebabCaseFileName,
                    interfaceOrClassName
                }
            }
        }

        files.push(file);
    }

    return files;
}

