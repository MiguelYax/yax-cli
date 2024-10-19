import { getFlags, Validations } from '../src';

describe('yax-cli', () => {
    test('print options', () => {
        const validations: Validations = {
            'help': {
              alias: 'h',
              description: "Display help",
              required: false, 
              type: 'boolean',
              default: false
            }
          }
          expect(getFlags(validations)).toEqual([ '--help, -h                             (optional) Display help'])
    })
});