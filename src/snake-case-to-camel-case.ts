export const snakeCaseToCamelCaseRichObject = (interfaceObject: Interface): CamelCaseRichObject => {
    const camelCaselizedContent = snakeCaseToCamelCase(interfaceObject.definition);
    const originalCaseKeysArray = originalCaseValuesInOriginalOrder(interfaceObject.definition);
    const camelCaseKeysArray = camelCaseValuesInOriginalOrder(camelCaselizedContent);
    const snakeCaseToCamelCaseMap = originalCaseKeysArray.reduce((acc, item, index) => { acc[item] = camelCaseKeysArray[index]; return acc; }, {} as Record<string, string>);
    const camelCaseToSnakeCaseMap = originalCaseKeysArray.reduce((acc, item, index) => { acc[camelCaseKeysArray[index]] = item; return acc; }, {} as Record<string, string>);
    return {
        camelCaselizedContent,
        camelCaseToSnakeCaseMap,
        snakeCaseToCamelCaseMap,
        interface: interfaceObject
    }
}

const snakeCaseToCamelCase = (content: string): string => {
    const regex = /[-_]([a-z])/gi;
    return content.replace(regex, (_a, b) => b.toUpperCase());
}

const originalCaseValuesInOriginalOrder = (content: string) => {
    const regex = /(\s|\{)([a-z-_0-9]+):/gi;
    const finalArray: string[] = [];
    let result!: RegExpExecArray | null;
    while ((result = regex.exec(content)) !== null) {
        finalArray.push(result[2]);
    }
    return finalArray;
}

const camelCaseValuesInOriginalOrder = (content: string) => {
    const regex = /(\s|\{)([a-z0-9]+):/gi;
    const finalArray: string[] = [];
    let result!: RegExpExecArray | null;
    while ((result = regex.exec(content)) !== null) {
        finalArray.push(result[2]);
    }
    return finalArray;
}