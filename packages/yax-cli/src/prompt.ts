import readline from 'readline';
import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';
export class Prompt {
  private rl: readline.Interface;

  constructor() {
    this.rl = createInterface({ input, output });
  }

  async input(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async confirm(question: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.rl.question(`${question} (y/n) `, (answer) => {
        const normalizedAnswer = answer.trim().toLowerCase();
        resolve(normalizedAnswer === 'y' || normalizedAnswer === 'yes');
      });
    });
  }

  async select<T>(question: string, options: T[]): Promise<T> {
    return new Promise((resolve) => {
      const formattedOptions = options.map((option, index) => `${index + 1}. ${option}`).join('\n');
      this.rl.question(`${question}\n${formattedOptions}\nSelect an option: `, (answer) => {
        const index = parseInt(answer.trim(), 10) - 1;
        if (index >= 0 && index < options.length) {
          resolve(options[index]);
        } else {
          console.log('Invalid selection, please try again.');
          this.select(question, options).then(resolve);
        }
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}
