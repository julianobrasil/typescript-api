export const pickFilesToWorkWith = (files: MigrationFile[]): MigrationFilesByType => {
    let typesFile: MigrationFile | null = null;
    const supportFiles: Record<string, MigrationFile> = {};
    let httpClientFile: MigrationFile | null = null;
    files.forEach(file => {
        if(file.name === 'data-contracts.ts') {
            typesFile = file;
        } else if(file.name !== 'http-client.ts') {
            supportFiles[file.name] = file;
        } else if(file.name === 'http-client.ts') {
            httpClientFile = file;
        }
    });

    if(!typesFile) {
        throw new Error('No types were found');
    }

    return {typesFile, supportFiles, httpClientFile};
}