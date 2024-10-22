import { pathfinder, getFiles } from '../src';

describe('yax-cli', () => {
  test('command pathfinder', () => {
    const commandsPath = `${__dirname}/cmds`;
    const files = getFiles(commandsPath, commandsPath)
    console.log(files);
    expect(files).toEqual([
      {
        "extension": ".ts",
        "filename": "index.ts",
        "name": "/home/myax/dev/yax-cli/tests/cmds/find/exact/index.ts",
        "path": "/find/exact/",
      },
      {
        "extension": ".ts",
        "filename": "index.ts",
        "name": "/home/myax/dev/yax-cli/tests/cmds/find/index.ts",
        "path": "/find/",
      },
      {
        "extension": ".ts",
        "filename": "index.ts",
        "name": "/home/myax/dev/yax-cli/tests/cmds/index.ts",
        "path": "/",
      },
      {
        "extension": ".ts",
        "filename": "index.ts",
        "name": "/home/myax/dev/yax-cli/tests/cmds/search/index.ts",
        "path": "/search/",
      },
    ]
    );
  });
});
