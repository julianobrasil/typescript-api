import { toKebabCase } from "./to-kebab-case";

export const breakDownInterfacesObjects = (typesFile: Partial<MigrationFile>) => {
    const content = typesFile?.content as string;
    const regex = /export ([a-z])+ [A-Z]([a-zA-Z0-9])+ {\n([\n\s\/*@a-zA-Z0-9?:;|"\[\]\}]|{(?!\n))+(}(?!;))/gm;
    let result: RegExpExecArray | null;

    const interfaces: Record<string, Interface> = {};
    const regexInterfaceName = /export interface ([a-zA-Z_0-9]+) {/
    while ((result = regex.exec(content)) !== null) {
        const definition = result[0];
        const name = (regexInterfaceName.exec(definition) ?? [])[1];
        const file = toKebabCase(name);
        interfaces[name] = {
            name, definition, file
        }
    }

    insertImportsStatements(interfaces);

    return interfaces;
}
/**
 * After the breaking down,  
 * @param interfaces 
 */
function insertImportsStatements(interfaces: Record<string, Interface>) {
    const types = Object.keys(interfaces);
    Object.entries(interfaces).forEach(([key, interf]) => {
        const toImport = types.filter(t => t !== key && interf.definition.includes(`: ${t}`));
        toImport.sort();
        if (toImport.length) {
            interf.definition = toImport
                .map(k => `import {${k}} from './${interfaces[k].file}';`)
                .join('\n') + '\n\n' + interf.definition;
        }
    })
}