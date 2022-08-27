declare type Interface = {
    name: string;
    file: string;
    originalDefinition: string;
    camelCaselizedDefinition: string;
    definitionWithMethods: string;
};

declare type FileType = 'model' | 'api-client-model' | 'http-client-source' | 'model-source' | 'api-source';
declare type BaseMigrationFile<T extends FileType> = {
    content: string;
    declaration?: {
        name: string;
        content: string;
    } | null;
    /** 
     * The type values with "source" in their names refer to the output of
     * swagger-typescript-api
     */
    type: T;
    processedContent?: {
        kebabCaseFileName?: string;
        camelCaseContent?: string;
        contentWithConvertionMethods?: string;
        camelCaseContentWithConvertionMethods?: string;
        snake_case2CamelCaseKeyMap?: { [snake_caseKey: string]: string };
        camelCase2Snake_caseKeyMap?: { [camelCaseKey: string]: string };
        interfaceOrClassName?: string; // Makes sense for model/api-model files
    }
}
declare type MigrationFile<T extends FileType> = T extends ('model' | 'api-client-model')
    ? BaseMigrationFile<T>
    : BaseMigrationFile<T> & { name: string };

declare type FileSingleLineDiff = {
    oldContent?: string;
    newContent?: string;
    lineNumber: number;
}

declare type FileDiffs = FileSingleLineDiff[];

declare type MigrationFilesByType = {
    typesFile: MigrationFile | null;
    supportFiles: Record<string, MigrationFile>;
    httpClientFile: MigrationFile | null,
}

declare type CamelCaseRichObject = {
    camelCaseToSnakeCaseMap: { [camelCaseValue: string]: string };
    snakeCaseToCamelCaseMap: { [snakeCaseValue: string]: string };
    camelCaselizedContent: string;
    interface: Interface
}