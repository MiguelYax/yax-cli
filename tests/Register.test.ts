import { Register } from "../src";

describe('Register mecanism', () => {

    test('register and call one command', () => {
        const commandsPath = `${__dirname}/cmds`;
        const proc = {
            argv: ['node', 'cwd/bin', 'hello']
        };
           new Register({
                description: 'my fist cli',
                commandsPath,
                process: proc
            });
    });

    test('register and call one command and the class has constructor', () => {
        const commandsPath = `${__dirname}/cmds`;
        const proc = {
            argv: ['node', 'cwd/bin', 'bye']
        };
           new Register({
                commandsPath,
                process: proc
            });
    });

    test('register and call one unexisting command', () => {
        const commandsPath = `${__dirname}/cmds`;
        const proc = {
            argv: ['node', 'cwd/bin', 'add']
        };
           new Register({
                commandsPath,
                process: proc
            });
    });

    test('register and call one unexisting command', () => {
        const commandsPath = `${__dirname}/cmds`;
        const proc = {
            argv: ['node', 'cwd/bin', 'run']
        };
           new Register({
                commandsPath,
                process: proc
            });
    });

});
