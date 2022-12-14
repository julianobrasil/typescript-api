import pkg from 'swagger-typescript-api';
import path from 'path';
import fs from 'fs';
import { generateFiles } from './src/generate-files';
import { pickFilesToWorkWith } from './src/pick-files-to-work-with';
import { breakDownInterfacesObjects } from './src/break-down-interfaces-objects';
import { createDirectoryIfNeeded } from './src/create-directory-if-needed';
import { SWAGGER_JSON } from './mock-data/swaggerspec';
import { Spec } from 'swagger-schema-official';
import { buildCamelCaseMaps } from './src/build-camel-case-maps';
import { addConvertMethods } from './src/add-convert-methods';
import { changeServiceInterfacesNames } from './src/change-service-interfaces-names';

const { generateApi } = pkg;

/**
 * 
 * @param basePath - Name of the directory where the files should be created. If it's a relative
 * path, it will be a relative path to this project root (not the workspace root)
 */
function buildTypesFromOpenApi(basePath: string) {
    createDirectoryIfNeeded(basePath);
    const generatedFilesPath = path.resolve(process.cwd(), "./__generated__");
    fs.rmSync(generatedFilesPath, {recursive: true, force: true});
    generateApi({
        url: 'https://petstore.swagger.io/v2/swagger.json',
        // spec: SWAGGER_JSON as Spec,
        output: generatedFilesPath,
        modular: true,
        httpClientType: 'fetch',
        extractRequestBody: true
    })
        .then(({ files }) => pickFilesToWorkWith(files))
        .then(({ typesFile, supportFiles, httpClientFile }) => 
                ({...breakDownInterfacesObjects(typesFile!, supportFiles), httpClientFile}))
        .then(({ interfacesData, supportFiles, httpClientFile }) => 
                ({camelCaseRichObjectMap: buildCamelCaseMaps(interfacesData), supportFiles, httpClientFile}))
        .then(({ camelCaseRichObjectMap, supportFiles, httpClientFile }) => 
                ({camelCaseRichObjectMap, supportFiles: changeServiceInterfacesNames(supportFiles), httpClientFile}))
        .then(({ camelCaseRichObjectMap, supportFiles, httpClientFile }) => 
                ({camelCaseRichObjectMap: addConvertMethods(camelCaseRichObjectMap), supportFiles, httpClientFile}))
        .then(({ camelCaseRichObjectMap, supportFiles, httpClientFile }) => {
            Object.entries(camelCaseRichObjectMap || {}).forEach(([key, value]) => {
                generateFiles(value, basePath);
            })
        })
        .catch(e => ({ typesFile: { content: 'ERROR', name: 'ERROR' }, supportFiles: {} }))
}

buildTypesFromOpenApi('generated-files');

