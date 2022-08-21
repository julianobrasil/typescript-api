import pkg from 'swagger-typescript-api';
import path from 'path';
import { SWAGGER_JSON } from './swaggerspec';
import { Spec } from 'swagger-schema-official';

type MigrationFile =  {
    name: string;
    content: string;
    declaration: {
        name: string;
        content: string;
    } | null;
}

const { generateApi } = pkg;
generateApi({
    url: 'https://petstore.swagger.io/v2/swagger.json',
    // spec: SWAGGER_JSON as Spec,
    output: path.resolve(process.cwd(), "./__generated__"),
    // hooks: {
    //     // onParseSchema: (originalSchema, parsedSchema) => {console.log(parsedSchema)},
    //     // onFormatRouteName: (route => console.log(route)),
    //     // onFormatTypeName: (t, t1) => console.log(t),
    //     onInit: (c) => console.log(c)
    // }
    modular: true,
    httpClientType: 'fetch',
}).then(({files}) => {
    let typesFile: MigrationFile | null = null;
    const supportFiles: Record<string, MigrationFile> = {};
    files.forEach(file => {
        if(file.name === 'data-contracts.ts') {
            typesFile = file;
        } else if(file.name !== 'http-client.ts') {
            supportFiles[file.name] = file;
        }
    });
    
    return {typesFile, supportFiles}
})
.catch(e => ({typesFile: {content: 'ERRROR'}, supportFiles: {}}))
.then(({typesFile, supportFiles}) => {
    const supportFileNames = Object.keys(supportFiles).map(key => key.split('.ts').join(''));
    const content = typesFile?.content as string;
    const regex = /export ([a-z])+ [A-Z]([a-zA-Z0-9])+ {\n([\n\s\/*@a-zA-Z0-9?:;|"\[\]\}]|{(?!\n))+(}(?!;))/gm;
    let result: RegExpExecArray | null;
    while((result = regex.exec(content)) !== null) {
        console.log(result[0]);
        console.log('NEXT');
    }
    console.log(supportFileNames);
})