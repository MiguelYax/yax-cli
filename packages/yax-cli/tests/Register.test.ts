import { Register } from "../src";

const shell = (command: string) => {
  const cli = new Register({
    description: 'Country Command Line Tool',
    commandsPath: `${__dirname}/cmds`,
    process:  {
      argv: ['node', 'cwd/bin', ...command.split(' ')]
    }
  });
  console.debug(cli.process);

  return cli;
};

describe('Register mecanism', () => {
  describe('help', () => {
    test('should show help', () => {
      const cli = shell('--help');
      expect(cli.errors).toEqual([]);
    });

    test('should show help with not fould command', () => {
      const cli =  shell('unknown');
      expect(cli.errors).toEqual(["Command not found: unknown"]);
    });
  });

  describe('should load dynamic module', () => {
    test('should load a object module', () => {
      const cli = shell('find --name Guatemala');
      expect(cli.errors).toEqual([]);
    });
    test('should load a object module', () => {
      const cli = shell('search --name li --limit 2');
      expect(cli.errors).toEqual([]);
    });
  });
});
