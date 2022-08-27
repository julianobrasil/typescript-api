export const changeServiceInterfacesNames = (supportFiles: Record<string, MigrationFile>) => {
    const regex = /class ([a-z_][a-z_0-9]*)/i
    // console.log(supportFiles)
    Object.entries(supportFiles).forEach(([key, value]) => {
        value.content = value.content.replace(regex, (_a, b) => `${b}Service`);
        value.name = value.name.split('.ts')?.[0].toLocaleLowerCase() + '.service.ts';
    })
    return supportFiles
}