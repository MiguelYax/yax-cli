import { readdirSync } from "fs";
import { parser } from "./parser";
import { Arguments, CommandInterface, Rule } from "./types";
import { showHelp } from "./helpers";
import debug from 'debug';

const log = debug('yax-cli:Register');

export type RegisterOptions = {
  commandsPath: string;
  description?: string;
  process: {
    argv: string[]
  }
}

const isClass = (v: CommandInterface | object): boolean => {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
};

export class Register implements CommandInterface {
  commands: string[];
  args: Arguments;
  options: RegisterOptions;
  examples = [];
  description: string;
  validations: Rule[] = [{
      flag: 'help',
      alias: 'h',
      description: "Display help",
      required: false, 
      type: 'boolean',
      default: false
    }]
  
  constructor(options: RegisterOptions) {
    this.args = parser(options.process.argv);
    this.commands = readdirSync(options.commandsPath);
    this.description = options.description ?? '';
    this.options = options;
  
    this.handler();
  }

  handler() {
    log('[COMMANDS]', this.commands);
    log('[ARGUMENTS]', this.args);
    if (this.commands.includes(this.args.command)) {
      const relativePath = `${this.options.commandsPath}/${this.args.command}`;
      log('[CMD PATH]', relativePath);
      import(relativePath) 
      .then((module) => {
        log('MODULE:', module);
        const Command = module.default;
        const cmd = isClass(Command) ? new Command : Command;
        cmd.handler();
      });
    } else { 
      showHelp(this, this.args);
    }
  }
}
