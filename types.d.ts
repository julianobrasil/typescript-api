declare type Interface = {
    name: string;
    file: string;
    definition: string;
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

declare type MigrationFilesByType = {typesFile: MigrationFile | null, supportFiles: Record<string, MigrationFile>}

declare type CamelCaseRichObject ={
    camelCaseToSnakeCaseMap: {[camelCaseValue: string]: string};
    snakeCaseToCamelCaseMap: {[snakeCaseValue: string]: string};
    camelCaselizedContent: string;
    interface: Interface
}