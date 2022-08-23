import { toKebabCase } from "./to-kebab-case";

export const breakDownInterfacesObjects = (typesFile: Partial<MigrationFile>, supportFiles: Record<string, MigrationFile>) => {
    const content = typesFile?.content as string;
    const regex = /export ([a-z])+ [A-Z]([a-zA-Z0-9])+ {\n([\n\s\/*@a-zA-Z0-9?:;|"\[\]\}]|{(?!\n))+(}(?!;))/gm;
    let result: RegExpExecArray | null;

    const interfaces: { [typeName: string]: Interface } = {};
    const apiInterfaces: { [typeName: string]: Interface } = {};
    const regexInterfaceName = /export interface ([a-zA-Z_0-9]+) {/
    // console.log({supportFiles})
    while ((result = regex.exec(content)) !== null) {
        const definition = result[0];
        const name = (regexInterfaceName.exec(definition) ?? [])[1];
        const file = toKebabCase(name);
        console.log(name)
        if (`${name}.ts` in supportFiles) {
            interfaces[name] = {
                name, definition, file
            }
        } else {
            apiInterfaces[name] = {
                name, definition, file
            }
        }
    }

    insertImportsStatements(interfaces, apiInterfaces);

    return {interfaces, apiInterfaces};
}
/**
 * After the breaking down,  
 * @param interfaces 
 */
function insertImportsStatements(interfaces: Record<string, Interface>, apiInterfaces: Record<string, Interface>) {
    const types = Object.keys(interfaces);
    console.log(types)
    const apiTypes = Object.keys(apiInterfaces);
    console.log(apiTypes)
    Object.entries(interfaces).forEach(([key, interf]) => {
        const toImport = types.filter(t => t !== key && interf.definition.includes(`: ${t}`)).concat(
            apiTypes.filter(t => t !== key && interf.definition.includes(`: ${t}`))
        );
        toImport.sort();
        if (toImport.length) {
            interf.definition = toImport
                .map(k => `import {${k}} from './${interfaces[k]?.file || apiInterfaces[k]?.file}';`)
                .join('\n') + '\n\n' + interf.definition;
        }
    })

    Object.entries(apiInterfaces).forEach(([key, interf]) => {
        const toImport = types.filter(t => t !== key && interf.definition.includes(`: ${t}`)).concat(
            apiTypes.filter(t => t !== key && interf.definition.includes(`: ${t}`))
        );
        toImport.sort();
        if (toImport.length) {
            interf.definition = toImport
                .map(k => `import {${k}} from './${apiInterfaces[k]?.file || interfaces[k]?.file}';`)
                .join('\n') + '\n\n' + interf.definition;
        }
    })
}