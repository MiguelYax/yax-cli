import { readdirSync } from "node:fs";
import { parser, getArgs } from "./parser";
import { Arguments, CommandInterface, Options, Rule, RegisterOptions, ProcessType } from "./types";
import { showHelp } from "./helpers";
import { verify } from "./validations";
import { pathfinder, PathfinderResolution } from "./pathfinder";

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
  args: Arguments;
  // resolution: PathfinderResolution;
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
    this.args = getArgs(this.process.argv);
    // this.resolution =  pathfinder(this.commandsPath, this.args);
    this.resolve(this, this.process);
  }

  static print(content: string[]): void {
    console.log(content.join('\n'));
  }

  resolve(context: CommandInterface, process: ProcessType) {
    const options = parser(this.args.flags, this.validations);
    this.commands = readdirSync(this.commandsPath);
    const { isValid, errors } = verify(options, context.validations);
    this.errors = errors;

    if (options.get('help') || !isValid) {
      Register.print(showHelp(context, this.args, this.commands, this.errors));
    } else {
      context.handler(options, this.args);
    }
  }

  async handler(ops: Options, args: Arguments) {
    const resolution  = pathfinder(this.commandsPath, this.args);
    if (resolution.config) {
      const module = await import(resolution.config.filePath);

      const Command = module.default;
      const cmd = isClass(Command) ? new Command() : Command;

      this.resolve(cmd, this.process);
    } else {
      this.errors = [`Command not found: ${this.args.commands.join(' ')}`];
      Register.print(showHelp(this, args, this.commands, this.errors));
    }
  }
}