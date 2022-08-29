export const addConvertMethods = (files: MigrationFile<FileType>[]) => {
    // console.log(camelCaseRichObjectMap)
    // Object.values(camelCaseRichObjectMap).forEach(v => {
    //     v.interface.camelCaselizedDefinition.replace(/}$/, 
    //         '\n'+
    //         'apiToAppModel(' + 
    //         extractParameters(v.interface.camelCaselizedDefinition) +
        
    //     '}')
    // })
    return files;
}

const extractParameters = (classData: string) => {

}