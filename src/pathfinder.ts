import { readdirSync, statSync } from "node:fs";
import { basename, extname } from "node:path";
import { Arguments } from "./types";

const supportedExtensions = ['.ts', '.js'];

export type CommandFile = {
  filePath: string
  commands: string[],
}

export type PathfinderResolution = {
  commandFiles: CommandFile[],
  config?: CommandFile,
}

export const resolveCommands = (root: string, commandsPath: string, commandFiles: CommandFile[] = []): CommandFile[] => {
  const fileList = readdirSync(commandsPath);
  for (const file of fileList) {
    const filePath = `${commandsPath}/${file}`;
    if (statSync(filePath).isDirectory()) {
      resolveCommands(root, filePath, commandFiles);
    } else {
      const extension = extname(filePath);
      if (supportedExtensions.includes(extension)) {

        const file = basename(filePath);
        const path = filePath
          .replace(root, '')
          .replace(file, '')
          .replace(/^\/|\/$/g, '');

        const commands = path.split('/');
        const filename = file.replace(extension, '');

        if (filename !== 'index') {
          commands.push(filename);
        }

        commandFiles.push({
          filePath,
          commands
        });
      }
    }
  }
  return commandFiles;
};

export const pathfinder =  (commandsPath: string, args: Arguments): PathfinderResolution => {
  const commandFiles = resolveCommands(commandsPath, commandsPath, []);
  const cmd = args.commands.join(' ');
  const config = commandFiles.find((c) => c.commands.join(' ') === cmd);
  // const command = (config) ? await import(config.filePath) : undefined;
  // const module = (command) ? command.default : undefined; 
  return {
    commandFiles,
    config
  };
};

