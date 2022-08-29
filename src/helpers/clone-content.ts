export const cloneContent = (files: MigrationFile<FileType>[], filterFn: (file: MigrationFile<FileType>) => boolean = () => true): MigrationFile<FileType>[] => files.filter(filterFn).map(f => {
    if (f.processedContent) {
        f.processedContent.camelCaseContent = f.content;
    }
    return f;
}).filter(Boolean);