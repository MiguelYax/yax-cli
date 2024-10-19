import { parser } from '../src';

describe('yax-cli', () => {
  test('print options', () => {
    const argv = ['node', 'cwd/bin', 'test', '-h','-o', 'dir', '-f', 'index.js', '-f', 'main.js', '-f', 'root.js'];
    const options = parser(argv);

    expect(options.get('h')).toEqual(true);
    expect(options.get('f')).toEqual(['index.js', 'main.js', 'root.js']);
  });
});
