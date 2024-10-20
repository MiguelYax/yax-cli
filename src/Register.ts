import { readdirSync } from "fs";
import { parser, getArgs } from "./parser";
import { Arguments, CommandInterface, Options, Rule } from "./types";
import { showHelp } from "./helpers";
import { verify } from "./validations";
import debug from 'debug';

const log = debug('yax-cli:Register');

export type RegisterOptions = {
  commandsPath: string;
  description: string;
}

export type ProcessType = {
  argv: string[]
}

const isClass = (v: CommandInterface | object): boolean => {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
};

export class Register implements CommandInterface {
  examples = [];
  commands: string[] = [];
  description: string;
  commandsPath: string;
  validations: Rule[] = [{
    flag: 'help',
    alias: 'h',
    description: "Display help",
    required: false,
    type: 'boolean',
    default: false
  }];

  constructor(ops: RegisterOptions) {
    this.commandsPath = ops.commandsPath;
    this.description = ops.description;
  }

  runtime (process: ProcessType) {
    const args = getArgs(process.argv);
    const options = parser(args.flags);
    this.commands = readdirSync(this.commandsPath);
    if (!args.command && (options.get('help') || options.get('h'))) {
      showHelp(this, args, this.commands);
    } else {
      this.handler(options, args);
    }
  }

  handler(ops: Options, args: Arguments) {
    log('[ARGUMENTS]', args);
    if (this.commands.includes(args.command)) {
      const relativePath = `${this.commandsPath}/${args.command}`;
      log('[CMD PATH]', relativePath);
      import(relativePath)
        .then((module) => {
          log('MODULE:', module);
          const Command = module.default;
          const cmd = isClass(Command) ? new Command : Command;

          const options = parser(args.flags);
          if (verify(options, cmd.validations)) {
            cmd.handler(options);
          } else {
            showHelp(cmd, args, []);
          }
        });
    } else {
      showHelp(this, args, this.commands);
    }
  }
}
