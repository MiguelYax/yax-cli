import { Register } from "../src";

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
      console.log('SHELL:', proc.argv)
      cli.runtime(proc);
    };
  });

  test('should show help', () => {
    shell('--help');
  });

  describe('using search command', () => {
    test('', () => {
      shell('search --name Andorra');
    });
    
    test('', () => {
      shell('search');
    });

    test('register and call one unexisting command', () => {
      shell('search --name Andorra');
    });
  
    test('register and call one unexisting command', () => {
      shell('search --name ania --limit 5');
    });
  });

  test('register and call one command and the class has constructor', () => {
    shell('find --code GT');
  });
});
