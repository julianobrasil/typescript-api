declare type Interface = {
    name: string;
    file: string;
    definition: string;
};

declare type MigrationFile =  {
    name: string;
    content: string;
    declaration: {
        name: string;
        content: string;
    } | null;
}