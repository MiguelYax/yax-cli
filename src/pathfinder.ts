import { readdirSync, statSync } from "node:fs";
import { basename, extname } from "node:path";

export type Files = {
  name: string
  filename: string
  extension: string,
  path: string
}

export const getFiles = (root: string, commandsPath: string, files: Files[] = [] ): Files[] => {
  const fileList = readdirSync(commandsPath)
  for (const file of fileList) {
    const name = `${commandsPath}/${file}`
    if (statSync(name).isDirectory()) {
      getFiles(root, name, files)
    } else {
      const filename =  basename(name);
      files.push({
        name,
        path: name.replace(root, '').replace(filename, ''),
        filename,
        extension: extname(name)
      })
    }
  }
  return files
}

export const pathfinder = (commandsPath: string): void => {
  const files = getFiles(commandsPath, commandsPath, []);
  console.log(files);

  const commands = files.map((f) => {
    return {

    }
  })
};


