import pkg from 'swagger-typescript-api';
import path from 'path';
import { generateAndDiff } from './src/generate-and-diff';
import { toKebabCase } from './src/to-kebab-case';
import { processGenerateApiOutput } from './src/process-generate-api-output';
import { extractInterfacesInfo } from './src/extract-interfaces-info';

const { generateApi } = pkg;
generateApi({
    url: 'https://petstore.swagger.io/v2/swagger.json',
    // spec: SWAGGER_JSON as Spec,
    output: path.resolve(process.cwd(), "./__generated__"),
    modular: true,
    httpClientType: 'fetch',
}).then(({ files }) => processGenerateApiOutput(files))
    .catch(e => ({ typesFile: { content: 'ERROR', name: 'ERROR' } }))
    .then(({ typesFile }) => typesFile && extractInterfacesInfo(typesFile)).then(interfaces => {
        Object.entries(interfaces ?? {}).forEach(([key, value]) => {
            generateAndDiff(value);
        })
    })

