# PROMPT

At CLI runtime The prompt utility could request information by asking information at the comandline. 

## Prompt 
| Property       | Description                                                                                         |
|----------------|-----------------------------------------------------------------------------------------------------|
| name           | Value used as key for the resolved question.                                                        |
| type           | Prompt type: `input, confirm, and select`                                                           |
| question       | Question message that is shown on the prompt                                                        |
| options        | (optional) List of values used for the select input type                                            |
| validate       | (optional) Boolean function to validate the input value                                             |


## Prompt example
```js
import { prompt } from 'yax-cli';

const questions: PromptType[] = [
    { name: 'name', question: 'First name?', type: 'input' },
    { name: 'continue', question: 'Continue?', type: 'confirm' },
    { name: 'color', question: 'Which color', type: 'select', options: ['red', 'green', 'yellow'] },
    { name: 'amount' question: 'Type an amount?' type: 'input' validate: (value) => /\d+/.test(value)}
];
const answers = await prompt(questions);
// Example of answers values
// { name: 'Miguel', continue: true, color: 'green', amount: '200' }
```