import { readdirSync } from "fs";
import { parser } from "./parser";
import { Arguments, CommandInterface, Validations } from "./types";
import { showHelp } from "./helpers";

export type RegisterOptions = {
  commandsPath: string;
  description?: string;
  process: {
    argv: string[]
  }
}

export class Register implements CommandInterface {
  commands: string[];
  args: Arguments;
  options: RegisterOptions
  examples = [];
  description: string;
  validations: Validations = {
    'help': {
      alias: 'h',
      description: "Display help",
      required: false, 
      type: 'boolean',
      default: false
    }
  }
  constructor(options: RegisterOptions) {
    this.args = parser(options.process.argv);
    this.commands = readdirSync(options.commandsPath);
    this.description = options.description ?? '';
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
    } else { 
      showHelp(this, this.args);
    }
  }
}
