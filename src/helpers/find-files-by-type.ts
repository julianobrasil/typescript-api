export const findFilesByType = <T extends FileType>(fileType: T, files: MigrationFile<FileType>[]): MigrationFile<T>[] => 
    ((Array.isArray(files) && files) || []).filter(file => file.type === fileType) as MigrationFile<T>[];

export const findFirstFileByType = <T extends FileType>(fileType: T, files: MigrationFile<FileType>[]): MigrationFile<T> | null =>
    findFilesByType(fileType, files)[0] ?? null;

export const findAndGroupFilesByType = <T extends FileType>(fileType: T, files: MigrationFile<FileType>[], keyBuilder: (file: MigrationFile<FileType>) => string) => {
    const filesOfType = findFilesByType(fileType, files);
    return filesOfType.reduce((acc, item) => {
        acc[keyBuilder(item)] = item;
        return acc;
    }, {} as Record<string, MigrationFile<T>>)
}