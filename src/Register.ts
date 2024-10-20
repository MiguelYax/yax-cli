import { readdirSync } from "fs";
import { parser, getArgs } from "./parser";
import { Arguments, CommandInterface, Options, Rule, RegisterOptions, ProcessType } from "./types";
import { showHelp } from "./helpers";
import { verify } from "./validations";
import debug from 'debug';

const log = debug('yax-cli:Register');

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
    const options = parser(args.argv, this.validations);
    this.commands = readdirSync(this.commandsPath);
    if (!args.command || options.get('help')) {
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

          const options = parser(args.argv, cmd.validations);
          const result = verify(options, cmd.validations);
          if (result.isValid) {
            cmd.handler(options);
          } else {
            showHelp(cmd, args, [], result.errors);
          }
        });
    } else {
      showHelp(this, args, this.commands);
    }
  }
}
