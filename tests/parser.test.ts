import { parser } from '../src';

describe('yax-cli', () => {
    test('print options', () => {
        const argv = ['node', 'cwd/bin', 'test', '-h','-o', 'dir', '-f', 'index.js', '-f', 'main.js', '-f', 'root.js'];
        const options = parser(argv);

         

          expect(options).toMatchObject(
           {
                node: 'node',
                path: 'cwd/bin',
                bin: 'bin',
                command: 'test'
           }
             
          );
    });
});
