import { parser, Rule } from '../src';

describe('yax-cli', () => {
  test('parse values', () => {
    const argv = ['node', 'cwd/bin', 'test', '-h','-o', 'dir', '-f', 'index.js', '-f', 'main.js', '-f', 'root.js'];
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
    const options = parser(argv, validations);

    expect(options.get('h')).toEqual(true);
    expect(options.get('f')).toEqual(['index.js', 'main.js', 'root.js']);
  });
});
