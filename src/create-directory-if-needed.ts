import fs from "fs";
import path from "path";

/**
 * This function is synchronous
 *
 * @param dirPath The relative or absolute path of the directory to be created (
 * if it starts with a "/" it's considered absolute. In all the other cases it's
 * considered relative)
 */
export function createDirectoryIfNeeded(dirPath: string) {
   const generatedFilesBasePath = dirPath.startsWith('/') ? path.normalize(dirPath) : path.resolve(process.cwd(), "./__generated__", path.normalize(dirPath));

   if(!fs.existsSync(dirPath)) {
       fs.mkdirSync(dirPath, { recursive: true });
   }
   if (!dirPath) {
       const errorMessage = `It wasn't possible to create the ${dirPath} directory`;
       console.error(errorMessage);
       throw new Error(errorMessage);
   }
}