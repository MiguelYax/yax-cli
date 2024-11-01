# VALIDATIONS
For each command can receive any options. As part of the validation process you could define a rule to ensure that option matches specifications. A command definition could specify a list of rules as validations. 

# Rule 
| Property       | Description                                                                                         |
|----------------|-----------------------------------------------------------------------------------------------------|
| flag           | Option flag is full name.   e.g. `file` and it should be represented as `--file`                    |
| alias          | Option alias is a short name.  e.g. `f` It should be represented as `-f`                            |
| description    | Option description is a text to describe the flag. e.g. `File name`                                 |
| required       | (boolean) It defines if the option value is required.                                               |
| type           | Option value type. Values: `string, number, boolean, or list`.  List supports a collection of strings. |
| default        | Option default value.  It define a default value for the option.                                    |

## Rule example
```js
  validations: Rule[] = [
    {
      flag: 'file',
      alias: 'f',
      description: "File name",
      required: true,
      type: 'string'
    },
    {
      flag: 'visible',
      alias: 'v',
      description: "Visible status",
      required: false,
      type: 'boolean', 
      default: true
    },
    {
      flag: 'limit',
      alias: 'l',
      description: 'Limit of files',
      required: false,
      type: 'number'
      default: 10
    }
  ];
```

### Find command definition

```ts
import { CommandInterface, Options, Rule, logger } from "yax-cli";

export default class Cmd implements CommandInterface {
  description = 'Find country by name';
  examples = [
    'find --code GT',
    'find -c US'
  ];
  validations: Rule[] = [
    {
      flag: 'code',
      alias: 'c',
      description: "Country code",
      required: true,
      type: 'string'
    }
  ];
  handler(options: Options) { 
    // You can do here wethever you want
  }
};
```
