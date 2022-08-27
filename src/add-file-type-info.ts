import { findFirstFileByType } from "./helpers/find-files-by-type";

export const addFileTypeInfo = <T extends ('model-source' | 'api-source' | 'http-client-source')>(files: MigrationFile<T>[]): MigrationFile<T>[] => {
    files.forEach(file => {
        file.type = file.name === 'data-contracts.ts' 
        ? 'model-source'
        : file.name !== 'http-client.ts'
        ? 'api-source'
        : 'http-client-source'
    });

    const hasModels: MigrationFile<'model-source'> | null = findFirstFileByType('model-source', files);

    if(!hasModels) {
        throw new Error('No model files were found');
    }

    return files;
}