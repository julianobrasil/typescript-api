import { findFilesByType } from "./helpers/find-files-by-type";

export const changeApiServicesNames = (files: MigrationFile<FileType>[]): MigrationFile<FileType>[] => {
    const supportFiles = findFilesByType('api-source', files);

    const regex = /class ([a-z_][a-z_0-9]*)/i;

    supportFiles.forEach((value) => {
        value.content = value.content.replace(regex, (_a, b) => `${b}Service`);
        value.name = value.name.split('.ts')?.[0].toLocaleLowerCase() + '.service.ts';
    });

    console.log(files.map(f => ({s2c: f.processedContent?.snake_case2CamelCaseKeyMap, c2s: f.processedContent?.camelCase2Snake_caseKeyMap})))

    return files;
}