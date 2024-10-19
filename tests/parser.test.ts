import { parser } from '../src';

describe('yax-cli', () => {
    test('print options', () => {
        const argv = ['node', 'cwd/bin', 'test', '-h','-o', 'dir', '-f', 'index.js', '-f', 'main.js', '-f', 'root.js'];
          expect(parser(argv)).toEqual(
            {
                node: 'node',
                path: 'cwd/bin',
                bin: 'bin',
                command: 'test',
                options: { 
                  h: true, 
                  o: 'dir',
                  f: ['index.js', 'main.js', 'root.js']
                 }
              }
          );
    });
});
