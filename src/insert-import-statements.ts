import { findFilesByType } from "./helpers/find-files-by-type";

export const insertImportStatements = (files: MigrationFile<FileType>[]): MigrationFile<FileType>[] => {
    const interfaces = findFilesByType('model', files);
    const apiInterfaces = findFilesByType('api-client-model', files);

    const types = interfaces.map(i => i.processedContent?.interfaceOrClassName).filter(Boolean);
    const apiTypes = apiInterfaces.map(i => i.processedContent?.interfaceOrClassName).filter(Boolean);

    interfaces.forEach((interfData) => {
        const interfaceOrClassName = interfData.processedContent?.interfaceOrClassName
        const toBeImported = types.filter(t => t !== interfaceOrClassName && interfData.content.includes(`: ${t}`)).concat(
            apiTypes.filter(t => t !== interfaceOrClassName && interfData.content.includes(`: ${t}`))
        );

        toBeImported.sort();
        if (toBeImported.length) {
            interfData.processedContent!.camelCaseContent = toBeImported
                .map(k => {
                    const interf = interfaces.find(i => i.processedContent?.interfaceOrClassName === k) ||
                        apiInterfaces.find(i => i.processedContent?.interfaceOrClassName === k);
                    return (interf && `import {${k}} from './${interf.processedContent?.kebabCaseFileName}';`) || null
                })
                .filter(Boolean)
                .join('\n') + '\n\n' + interfData.processedContent?.camelCaseContent;
        }
    });

    apiInterfaces.forEach((interfData) => {
        const interfaceOrClassName = interfData.processedContent?.interfaceOrClassName
        const toBeImported = types.filter(t => t !== interfaceOrClassName && interfData.content.includes(`: ${t}`)).concat(
            apiTypes.filter(t => t !== interfaceOrClassName && interfData.content.includes(`: ${t}`))
        );

        toBeImported.sort();
        if (toBeImported.length) {
            interfData.processedContent!.camelCaseContent = toBeImported
                .map(k => {
                    const interf = interfaces.find(i => i.processedContent?.interfaceOrClassName === k) ||
                        apiInterfaces.find(i => i.processedContent?.interfaceOrClassName === k);
                    return (interf && `import {${k}} from './${interf.processedContent?.kebabCaseFileName}';`) || null
                })
                .filter(Boolean)
                .join('\n') + '\n\n' + interfData.processedContent?.camelCaseContent;
        }
    });

    return files;
}