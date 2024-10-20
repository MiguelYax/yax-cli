import { Register } from "../src";
import debug from "debug";

const log =  debug('yax-cli:test');

let shell: (cmd: string) => void;
describe('Register mecanism', () => {
  beforeAll(() => {
    const commandsPath = `${__dirname}/cmds`;
    const cli = new Register({
      description: 'Country CLI',
      commandsPath
    });
    shell = (cmd: string) => {
      const proc = {
        argv: ['node', 'cwd/bin', ...cmd.split(' ')]
      };
      log('SHELL:', proc.argv);
      cli.runtime(proc);
    };
  });
  describe('help', () => {
    test('should show help', () => {
      shell('--help');
    });

    test('should show help with not fould command', () => {
      shell('unknown')
    })

    test('should show help regarding required options', () => {
      shell('search') 
    })
  });



  describe('serarch command (exported as object)', () => {
    test('should search a country', () => {
      shell('search --name Andorra');
    });
  
    test('should search country and use limit', () => {
      shell('search --name ania --limit 5');
    });
  });
  describe('find command (exported as class)', () => {
    test('register and call one command and the class has constructor', () => {
      shell('find --code GT');
    });
  })
});
