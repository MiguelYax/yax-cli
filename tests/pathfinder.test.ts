import { pathfinder, getFiles } from '../src';

describe('get files', () => {
  test('resolve posible cmds', () => {
    const commandsPath = `${__dirname}/cmds`;
    const files = getFiles(commandsPath, commandsPath)
    console.log(files);
    expect(files).toEqual(
      [
        {
          name: '/home/myax/dev/yax-cli/tests/cmds/find/index.ts',
          path: 'find',
          filename: 'index',
          extension: '.ts',
          commands: [ 'find' ]
        },
        {
          name: '/home/myax/dev/yax-cli/tests/cmds/index.ts',
          path: '',
          filename: 'index',
          extension: '.ts',
          commands: [ '' ]
        },
        {
          name: '/home/myax/dev/yax-cli/tests/cmds/search/index.ts',
          path: 'search',
          filename: 'index',
          extension: '.ts',
          commands: [ 'search' ]
        },
        {
          name: '/home/myax/dev/yax-cli/tests/cmds/search/location.ts',
          path: 'search',
          filename: 'location',
          extension: '.ts',
          commands: [ 'search', 'location' ]
        }
      ]
    );
  });
});
