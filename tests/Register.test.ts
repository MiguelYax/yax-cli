import { Register, logger } from "../src";

const shell = (command: string) => {
  const cli = new Register({
    description: 'Country CLI',
    commandsPath: `${__dirname}/cmds`,
    process:  {
      argv: ['node', 'cwd/bin', ...command.split(' ')]
    }
  });
  logger.debug(cli.process);

  return cli;
};

describe.only('Register mecanism', () => {

  describe('help', () => {
    test('should show help', () => {
      const print = jest.spyOn(Register, 'print');
      shell('--help');
      expect(print).toHaveBeenCalledTimes(1);
      expect(print).toHaveBeenCalledWith(
        expect.arrayContaining(
          ["USAGE: bin <COMMAND> [OPTIONS]", "DESCRIPTION: Country CLI", "COMMANDS:", "  - find", "  - search", "OPTIONS:", "--help, -h                             (optional) Display help"]
        )
      );
      print.mockRestore();
    });

    test('should show help with not fould command', () => {
      const print = jest.spyOn(Register, 'print');
      shell('unknown');
      expect(print).toHaveBeenCalledTimes(1);
      expect(print).toHaveBeenCalledWith(
        expect.arrayContaining(
          ["USAGE: bin <COMMAND> [OPTIONS]", "COMMAND: unknown", "DESCRIPTION: Country CLI", "COMMANDS:", "  - find", "  - search", "ERRORS:", "  - Command not found: unknown", "OPTIONS:", "--help, -h                             (optional) Display help"]
        )
      );
      print.mockRestore();
    });

    test('should show help with required options', () => {
      const log = jest.spyOn(Register,'print');
      shell('search'); 
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('The flag: --name is required!')
      );
      log.mockRestore();
    });
  });

  describe('serarch command (exported as object)', () => {
    test('should search a country', () => {
      const log = jest.spyOn(logger, 'log');

      shell('search --name a');
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('Guatemala')
      );
      log.mockRestore();
    });
  
    test('should search country and use limit', () => {
      const log = jest.spyOn(logger, 'log');
      shell('search --name e --limit 5');
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(
        expect.arrayContaining(
          ["Costa Rica", "El Salvador", "Guatemala"]
        )
      );
      log.mockRestore();
    });
  });
  describe('find command (exported as class)', () => {
    test('register and call one command and the class has constructor', () => {
      const log = jest.spyOn(logger, 'log');
      shell('find --name Guatemala');
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('Guatemala')
      );
      log.mockRestore();
    });
  });
});
