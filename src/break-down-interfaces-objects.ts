import { findAndGroupFilesByType, findFilesByType, findFirstFileByType } from "./helpers/find-files-by-type";
import { toKebabCase } from "./to-kebab-case";

export const breakDownInterfacesObjects = (files: MigrationFile<FileType>[]): MigrationFile<FileType>[] => {
    const modelSource = findFirstFileByType('model-source', files);
    if(!modelSource) {
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
    console.log(files)
    // insertImportsStatements(files);

    return files;
}

/**
 * After the breaking down,  
 * @param interfaces 
 */
// function insertImportsStatements(files: MigrationFile<FileType>[]) {
//     const interfaces = findFilesByType('model', files);
//     const apiInterfaces = findFilesByType('api-client-model', files);

//     const types = Object.keys(interfaces);
//     const apiTypes = Object.keys(apiInterfaces);

//     console.log({types, apiTypes});

//     Object.entries(interfaces).forEach(([key, interf]) => {
//         const toImportCamelCaselizedDefintion = types.filter(t => t !== key && interf.camelCaselizedDefinition.includes(`: ${t}`)).concat(
//             apiTypes.filter(t => t !== key && interf.camelCaselizedDefinition.includes(`: ${t}`))
//         );

//         toImportCamelCaselizedDefintion.sort();
//         if (toImportCamelCaselizedDefintion.length) {
//             interf.camelCaselizedDefinition = toImportCamelCaselizedDefintion
//                 .map(k => `import {${k}} from './${interfaces[k]?.file || apiInterfaces[k]?.file}';`)
//                 .join('\n') + '\n\n' + interf.camelCaselizedDefinition;

//             interf.camelCaselizedDefinition = toImportCamelCaselizedDefintion
//                 .map(k => `import {${k}} from './${interfaces[k]?.file || apiInterfaces[k]?.file}';`)
//                 .join('\n') + '\n\n' + interf.camelCaselizedDefinition;
//         }
//     })

//     Object.entries(apiInterfaces).forEach(([key, interf]) => {
//         const toImport = types.filter(t => t !== key && interf.camelCaselizedDefinition.includes(`: ${t}`)).concat(
//             apiTypes.filter(t => t !== key && interf.camelCaselizedDefinition.includes(`: ${t}`))
//         );
//         toImport.sort();
//         if (toImport.length) {
//             interf.camelCaselizedDefinition = toImport
//                 .map(k => `import {${k}} from './${apiInterfaces[k]?.file || interfaces[k]?.file}';`)
//                 .join('\n') + '\n\n' + interf.camelCaselizedDefinition;
//         }
//     })
// }