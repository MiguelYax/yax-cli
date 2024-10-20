import { readdirSync } from "node:fs";
import { parser, getArgs } from "./parser";
import { Arguments, CommandInterface, Options, Rule, RegisterOptions, ProcessType } from "./types";
import { showHelp } from "./helpers";
import { verify } from "./validations";
import { logger } from "./logger";

const isClass = (v: CommandInterface | object): boolean => {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
};

export class Register implements CommandInterface {
  examples = [];
  commands: string[] = [];
  description: string;
  commandsPath: string;
  process: ProcessType;
  errors: string[];
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
    this.process = ops.process;
    this.errors = [];
    this.resolve(this, this.process);
  }

  static print (content: string[]) :void {
    logger.log(content.join('\n'));
  }

  resolve(context: CommandInterface, process: ProcessType) {
    const args = getArgs(process.argv);
    const options = parser(args.argv, this.validations);
    this.commands = readdirSync(this.commandsPath);
    const { isValid, errors } = verify(options, context.validations);
    this.errors = errors;

    if (!args.command || options.get('help') || !isValid) {
      Register.print(showHelp(context, args, this.commands, this.errors));
    } else {
      context.handler(options, args);
    }
  }

  handler(ops: Options, args: Arguments) {
    if (args.command && this.commands.includes(args.command)) {
      const relativePath = `${this.commandsPath}/${args.command}`;
      import(relativePath)
        .then((module) => {
          const Command = module.default;
          const cmd = isClass(Command) ? new Command() : Command;
          
          this.resolve(cmd, this.process);
        });
    } else {
      this.errors = [`Command not found: ${args.command}`];
      Register.print(showHelp(this, args, this.commands, this.errors));
    }
  }
}
