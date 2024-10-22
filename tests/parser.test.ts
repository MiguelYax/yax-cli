import { Arguments, getArgs, parser, Rule } from '../src';

describe('parser', () => {
  test('parse values', () => {
    const flags = ['-h','-o', 'dir', '-f', 'index.js', '-f', 'main.js', '-f', 'root.js', '--name', 'Miguel'];
    const validations: Rule[] = [
      {
        flag: 'help',
        alias: 'h',
        description: 'Show help',
        type: 'string',
        required: false,
        default: false
      },
      {
        flag: 'file',
        alias: 'f',
        description: 'Files',
        type: 'list',
        required: true
      }
    ];
    const options = parser(flags, validations);
    expect(options.get('h')).toEqual(true);
    expect(options.get('name')).toEqual('Miguel');
    expect(options.get('f')).toEqual(['index.js', 'main.js', 'root.js']);
  });
});
describe('args resolution', () => {
  test('args with multiple commands', () => {
    const argv = ['node', 'cwd/bin', 'generate', 'app',  '-o', '/usr/home/app'];
    const args: Arguments = getArgs(argv);
  
    expect(args.commands).toEqual(['generate', 'app']);
    expect(args.flags).toEqual(['-o', '/usr/home/app']);
  })

  test('args without commands', () => {
    const argv = ['node', 'cwd/bin'];
    const args: Arguments = getArgs(argv);
  
    expect(args.commands).toEqual([]);
    expect(args.flags).toEqual([]);
  })

  test('args without commands but with flags', () => {
    const argv = ['node', 'cwd/bin', '-o', '/usr/home/app'];
    const args: Arguments = getArgs(argv);
  
    expect(args.commands).toEqual([]);
    expect(args.flags).toEqual(['-o', '/usr/home/app']);
  })
})
