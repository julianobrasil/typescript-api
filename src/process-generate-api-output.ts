export const processGenerateApiOutput = (files: MigrationFile[]) => {
    let typesFile: MigrationFile | null = null;
    const supportFiles: Record<string, MigrationFile> = {};
    files.forEach(file => {
        if(file.name === 'data-contracts.ts') {
            typesFile = file;
        } else if(file.name !== 'http-client.ts') {
            supportFiles[file.name] = file;
        }
    });

    return {typesFile, supportFiles};
}