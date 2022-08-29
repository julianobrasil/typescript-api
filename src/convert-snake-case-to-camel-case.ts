export const convertSnakeCaseToCamelCase = (file: MigrationFile<'api-client-model' | 'model'>): MigrationFile<'api-client-model' | 'model'> => {
    const camelCaseKeysArray = camelCaseValuesInOriginalOrder(file.processedContent?.camelCaseContent ?? '');
    
    // Convert the content attribute names to CamelCase
    file.processedContent!.camelCaseContent = snakeCaseToCamelCase(file.processedContent?.camelCaseContent ?? '');
    const originalCaseKeysArray = originalCaseValuesInOriginalOrder(file.processedContent?.camelCaseContent ?? '');

    file.processedContent!.snake_case2CamelCaseKeyMap = originalCaseKeysArray.reduce((acc, item, index) => { acc[item] = camelCaseKeysArray[index]; return acc; }, {} as Record<string, string>);
    file.processedContent!.camelCase2Snake_caseKeyMap = originalCaseKeysArray.reduce((acc, item, index) => { acc[camelCaseKeysArray[index]] = item; return acc; }, {} as Record<string, string>);
    
    return file;
}

const snakeCaseToCamelCase = (content: string): string => {
    const regex = /[-_]([a-z])/gi;
    return content.replace(regex, (_a, b) => b.toUpperCase());
}

const originalCaseValuesInOriginalOrder = (content: string) => {
    const regex = /(\s|\{)([a-z-_0-9]+)\??:/gi;
    const finalArray: string[] = [];
    let result!: RegExpExecArray | null;
    while ((result = regex.exec(content)) !== null) {
        finalArray.push(result[2]);
    }
    return finalArray;
}

const camelCaseValuesInOriginalOrder = (content: string) => {
    const regex = /(\s|\{)([a-z0-9]+)\??:/gi;
    const finalArray: string[] = [];
    let result!: RegExpExecArray | null;
    while ((result = regex.exec(content)) !== null) {
        finalArray.push(result[2]);
    }
    return finalArray;
}