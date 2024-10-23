import { readdirSync, statSync } from "node:fs";
import { basename, extname } from "node:path";
import { Arguments, CommandRoute } from "./types";

const supportedExtensions = ['.ts', '.js'];

export const resolveCommands = (root: string, commandsPath: string, commandFiles: CommandRoute[]): CommandRoute[] => {
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

export const pathfinder =  (commandsPath: string, args: Arguments): { commands: CommandRoute[], command?: CommandRoute  } => {
  const commands = resolveCommands(commandsPath, commandsPath, []);
  const cmd = args.commands.join(' ');
  const command = commands.find((c) => c.commands.join(' ') === cmd);

  return {
    commands,
    command
  };
};

