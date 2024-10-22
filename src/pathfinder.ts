import { readdirSync, statSync } from "node:fs";
import { basename, extname } from "node:path";
import { Arguments } from "./types";

const supportedExtensions = ['.ts', '.js']

export type Files = {
  name: string
  filename: string
  extension: string,
  commands: string[],
  path: string
}

export const getFiles = (root: string, commandsPath: string, files: Files[] = [] ): Files[] => {
  const fileList = readdirSync(commandsPath)
  for (const file of fileList) {
    const name = `${commandsPath}/${file}`
    if (statSync(name).isDirectory()) {
      getFiles(root, name, files)
    } else {
      const extension = extname(name) ;
      if (supportedExtensions.includes(extension)) {

        const file = basename(name);
        const path = name
        .replace(root, '')
        .replace(`${file}`, '')
        .replace(/^\/|\/$/g, '');

        const commands = path.split('/');
        const filename = file.replace(extension, '');

        if (filename !== 'index' )  {
          commands.push(filename)
        }

        files.push({
          name,
          path,
          filename,
          extension,
          commands
        })
      }
    }
  }
  return files
}

export const pathfinder = (commandsPath: string, args: Arguments): void => {
  const files = getFiles(commandsPath, commandsPath, []);
  console.log(files);
  console.log(args);

  const commands = files.map((f) => {
    return {

    }
  })
};


