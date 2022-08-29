import { findFilesByType } from "./helpers/find-files-by-type";
import { convertSnakeCaseToCamelCase } from "./convert-snake-case-to-camel-case";

export const camelCaselize = (files: MigrationFile<FileType>[]) => {
    const apiInterfaces = findFilesByType('api-client-model', files);
    const interfaces = findFilesByType('model', files);

    // Turn the interfaces into objects
    interfaces.forEach(value => value.processedContent!.camelCaseContent = value.processedContent?.camelCaseContent?.replaceAll('interface', 'class'));
    apiInterfaces.forEach(value => value.processedContent!.camelCaseContent = value.processedContent?.camelCaseContent?.replaceAll('interface', 'class'));

    interfaces.forEach((value) => convertSnakeCaseToCamelCase(value));
    apiInterfaces.forEach((value) => convertSnakeCaseToCamelCase(value));
    
    return files;
}