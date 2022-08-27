export const addConvertMethods = (camelCaseRichObjectMap: Record<string, CamelCaseRichObject>) => {
    // console.log(camelCaseRichObjectMap)
    // Object.values(camelCaseRichObjectMap).forEach(v => {
    //     v.interface.camelCaselizedDefinition.replace(/}$/, 
    //         '\n'+
    //         'apiToAppModel(' + 
    //         extractParameters(v.interface.camelCaselizedDefinition) +
        
    //     '}')
    // })
    return camelCaseRichObjectMap;
}

const extractParameters = (classData: string) => {

}