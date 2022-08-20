import pkg from 'swagger-typescript-api';
import path from 'path';

const { generateApi } = pkg;

generateApi({
    url: 'https://petstore.swagger.io/v2/swagger.json',
    output: path.resolve(process.cwd(), "./__generated__"),
    // hooks: {
    //     // onParseSchema: (originalSchema, parsedSchema) => {console.log(parsedSchema)},
    //     // onFormatRouteName: (route => console.log(route)),
    //     // onFormatTypeName: (t, t1) => console.log(t),
    //     onInit: (c) => console.log(c)
    // }
    modular: true,
}).then(({files}) => {
    console.log('files: ', files.length)
    // files.forEach(file => console.log(file.content));
})