declare type Interface = {
    name: string;
    file: string;
    originalDefinition: string;
    camelCaselizedDefinition: string;
    definitionWithMethods: string;
};

declare type MigrationFile = {
    name: string;
    content: string;
    declaration: {
        name: string;
        content: string;
    } | null;
}

declare type FileSingleLineDiff =  {
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

declare type CamelCaseRichObject ={
    camelCaseToSnakeCaseMap: {[camelCaseValue: string]: string};
    snakeCaseToCamelCaseMap: {[snakeCaseValue: string]: string};
    camelCaselizedContent: string;
    interface: Interface
}