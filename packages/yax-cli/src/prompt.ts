import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

export class PromptReader {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  async input(config: PromptType): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`${config.question}\n`, (answer) => {
        const value = answer.trim();
        if (!value) {
          console.log('Input cannot be empty, please try again.');
          return this.input(config).then(resolve);
        }
        if (config.validate) {
          const isValid = config.validate(value);
          if (!isValid) {
            console.log('Invalid input, please try again.');
            return this.input(config).then(resolve);
          }
        }
        resolve(answer);
      });
    });
  }

  async confirm(config: PromptType): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question(`${config.question}\n(y/n): `, (answer) => {
        const normalizedAnswer = answer.trim().toLowerCase();
        return resolve(normalizedAnswer === 'y' || normalizedAnswer === 'yes');
      });
    });
  }

  async select(config: PromptType): Promise<string> {
    return new Promise((resolve) => {
      const items = config.options ?? [];
      const size = items.length;
      if (size === 0) {
        return resolve('');
      }

      const formattedOptions = items.map((option, index) => `${index + 1}. ${option}`).join('\n');
      this.rl.question(`${config.question}\n${formattedOptions}\nSelect an option: `, (answer) => {
        const index = parseInt(answer.trim(), 10) - 1;
        if (index >= 0 && index < size) {
          resolve(items[index]);
        } else {
          console.log('Invalid selection, please try again.');
          return this.select(config).then(resolve);
        }
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}

export type PromptType = {
  name: string
  question: string;
  type: 'input' | 'confirm' | 'select';
  validate?: (input: string) => boolean;
  options?: string[];
}

export type PromptAnswerType = {
  [key: string]: string | boolean;
}

export const prompt = async (questions: PromptType[]) => { 
  const reader = new PromptReader();
  const answers : PromptAnswerType = {};

  for (const q of questions) {
    answers[q.name] = await reader[q.type](q);
  }

  reader.close();
  return answers;
};
