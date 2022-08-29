import pkg from 'swagger-typescript-api';
import path from 'path';
import fs from 'fs';
import { generateFiles } from './src/generate-files';
import { addFileTypeInfo } from './src/add-file-type-info';
import { breakDownInterfacesObjects } from './src/break-down-interfaces-objects';
import { createDirectoryIfNeeded } from './src/create-directory-if-needed';
import { SWAGGER_JSON } from './mock-data/swaggerspec';
import { Spec } from 'swagger-schema-official';
import { camelCaselize } from './src/camel-caselize';
import { addConvertMethods } from './src/add-convert-methods';
import { changeApiServicesNames } from './src/change-api-services-names';
import { insertImportStatements } from './src/insert-import-statements';
import { cloneContent } from './src/helpers/clone-content';

const { generateApi } = pkg;

/**
 * 
 * @param basePath - Name of the directory where the files should be created. If it's a relative
 * path, it will be a relative path to this project root (not the workspace root)
 */
function buildTypesFromOpenApi(basePath: string) {
    createDirectoryIfNeeded(basePath);
    const generatedFilesPath = path.resolve(process.cwd(), './__generated__');
    fs.rmSync(generatedFilesPath, { recursive: true, force: true });
    generateApi({
        url: 'https://petstore.swagger.io/v2/swagger.json',
        // spec: SWAGGER_JSON as Spec,
        output: generatedFilesPath,
        modular: true,
        httpClientType: 'fetch',
        extractRequestBody: true
    })
        .then(({ files }) => addFileTypeInfo(files as unknown as MigrationFile<'model-source' | 'api-source' | 'http-client-source'>[]))
        .then((files) => breakDownInterfacesObjects(files))
        .then((files) => cloneContent(files, (file) => ['model', 'api-client-model'].includes(file.type)))
        .then((files) => insertImportStatements(files))
        .then((files) => camelCaselize(files))
        .then((files) => changeApiServicesNames(files))
        .then((files) => addConvertMethods(files))
        // .then(({ camelCaseRichObjectMap, supportFiles, httpClientFile }) => {
        //     Object.entries(camelCaseRichObjectMap || {}).forEach(([key, value]) => {
        //         generateFiles(value, basePath);
        //     })
        // })
        .catch(e => ({ typesFile: { content: 'ERROR', name: 'ERROR' }, supportFiles: {} }))
}

buildTypesFromOpenApi('generated-files');

