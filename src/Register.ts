import { readdirSync } from "fs";
import { parser } from "./parser";
import { Arguments } from "./types";

export type RegisterOptions = {
  commandsPath: string;
  process: {
    argv: string[]
  }
}

export class Register {
  commands: string[];
  args: Arguments;
  options: RegisterOptions
  constructor(options: RegisterOptions) {
    this.args = parser(options.process.argv);
    this.commands = readdirSync(options.commandsPath);
    this.options = options;
  
    this.handler();
  }

  handler() {
    if (this.commands.includes(this.args.command)) {
      import(`${this.options.commandsPath}/${this.args.command}`) 
      .then((module) => {
        const Command = module.default;
        const cmd = Command.constructor ? new Command : Command;
        cmd.handler();
      })
    }
  }
}
