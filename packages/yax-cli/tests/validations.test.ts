import { All, Options, Rule, verify } from "../src";

describe('validations', () => {
  test('required values', () => {
    const opts: Options = new Map<string, All>();
    const validations: Rule[] = [{
      flag: 'file',
      alias: 'f',
      description: 'File name',
      required: true,
      type: 'string'
    }];

    const result = verify(opts, validations);
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(["The flag: --file is required!"]);
  });

  test('default values', () => {
    const opts: Options = new Map<string, All>();
    const validations: Rule[] = [{
      flag: 'enabled',
      alias: 'e',
      description: 'Feature enabled',
      required: false,
      type: 'boolean',
      default: true
    }];

    const result = verify(opts, validations);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(opts.get('enabled')).toBe(true);
  });

  test('set alias or flag', () => {
    const opts: Options = new Map<string, All>();
    const file= 'main.js';
    const enabled = true;
    opts.set('f', file );
    opts.set('e', enabled);

    const validations: Rule[] = [
      {
        flag: 'enabled',
        alias: 'e',
        description: 'Feature enabled',
        required: false,
        type: 'boolean',
        default: true
      },
      {
        flag: 'file',
        alias: 'f',
        description: 'File name',
        required: true,
        type: 'string'
      }
    ];

    const result = verify(opts, validations);
    expect(result.isValid).toBe(true);
    expect(opts.get('enabled')).toBe(enabled);
    expect(opts.get('file')).toBe(file);
  });

  test('list with default values', () => {
    const countries = ['GT', 'US'];
    const opts: Options = new Map<string, All>();
    const validations: Rule[] = [{
      flag: 'code',
      alias: 'c',
      description: 'Country code',
      required: false,
      list: true,
      type: 'list',
      default: countries
    }];

    const result = verify(opts, validations);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(opts.get('code')).toBe(countries);
  });
});
