import { snakeCaseToCamelCaseRichObject } from "./snake-case-to-camel-case";

export const buildCamelCaseMaps = (interfacesData: boolean | {interfaces: {[typeName: string]: Interface}, apiInterfaces: {[typeName: string]: Interface}}) => {
    if(typeof interfacesData === 'boolean') {
        return {} as Record<string, CamelCaseRichObject>;
    }

    // Turn the interfaces into objects
    (Object.values(interfacesData.interfaces) as Interface[]).forEach(value => value.camelCaselizedDefinition = value.camelCaselizedDefinition.replaceAll('interface', 'class'));
    (Object.values(interfacesData.apiInterfaces) as Interface[]).forEach(value => value.camelCaselizedDefinition = value.camelCaselizedDefinition.replaceAll('interface', 'class'));

    const fromInterfaces = (Object.entries(interfacesData.interfaces) as [string, Interface][]).reduce((acc, [key, value]) => {
        acc[key] = snakeCaseToCamelCaseRichObject(value);
        return acc;
    }, {} as Record<string, CamelCaseRichObject>);

    const fromApiInterfaces = (Object.entries(interfacesData.apiInterfaces) as [string, Interface][]).reduce((acc, [key, value]) => {
        acc[key] = snakeCaseToCamelCaseRichObject(value);
        return acc;
    }, {} as Record<string, CamelCaseRichObject>)

    return {
        ...fromApiInterfaces,
        ...fromInterfaces
    }
}