import { PromptReader, prompt, PromptType } from '../src';

jest.mock('readline', () => {
  const questionMock = jest.fn();
  return {
    createInterface: jest.fn(() => ({
      question: questionMock,
      close: jest.fn()
    })),
    questionMock
  };
});

const { questionMock } = jest.requireMock('readline');

describe('PromptReader', () => {
  let reader: PromptReader;

  beforeEach(() => {
    reader = new PromptReader();
    questionMock.mockReset();
  });

  afterEach(() => {
    reader.close();
  });

  it('input: should resolve with valid input', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('hello'));
    const config: PromptType = { name: 'test', question: 'Enter:', type: 'input' };
    await expect(reader.input(config)).resolves.toBe('hello');
  });

  it('input: should retry on empty input', async () => {
    let call = 0;
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => {
      call++;
      cb(call === 1 ? '' : 'world');
    });
    const config: PromptType = { name: 'test', question: 'Enter:', type: 'input' };
    await expect(reader.input(config)).resolves.toBe('world');
  });

  it('input: should retry on filed validate', async () => {
    let call = 0;
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => {
      call++;
      cb(call === 1 ? 'bad' : 'good');
    });
    const config: PromptType = {
      name: 'test',
      question: 'Enter:',
      type: 'input',
      validate: (input) => input === 'good',
    };
    await expect(reader.input(config)).resolves.toBe('good');
  });

  it('confirm: should resolve true for yes', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('y'));
    const config: PromptType = { name: 'confirm', question: 'Continue?', type: 'confirm' };
    await expect(reader.confirm(config)).resolves.toBe(true);
  });

  it('confirm: should resolve false for no', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('n'));
    const config: PromptType = { name: 'confirm', question: 'Continue?', type: 'confirm' };
    await expect(reader.confirm(config)).resolves.toBe(false);
  });

  it('select: should resolve with selected option', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('2'));
    const config: PromptType = {
      name: 'select',
      question: 'Pick one',
      type: 'select',
      options: ['a', 'b', 'c']
    };
    await expect(reader.select(config)).resolves.toBe('b');
  });

    it('select: should return an empty', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('2'));
    const config: PromptType = {
      name: 'select',
      question: 'Pick one',
      type: 'select',
    };
    await expect(reader.select(config)).resolves.toBe('');
  });

  it('select: should retry on invalid selection', async () => {
    let call = 0;
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => {
      call++;
      cb(call === 1 ? '5' : '1');
    });
    const config: PromptType = {
      name: 'select',
      question: 'Pick one',
      type: 'select',
      options: ['a', 'b']
    };
    await expect(reader.select(config)).resolves.toBe('a');
  });

  it('close: should call rl.close', () => {
    const closeMock = reader['rl'].close as jest.Mock;
    reader.close();
    expect(closeMock).toHaveBeenCalled();
  });

  it('should resolve answers for all types', async () => {
    const values = ['Miguel', 'y', '2'];
    let count = 0;
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => {
      cb(values[count++]);
    });
    const questions: PromptType[] = [
      { name: 'name', question: 'First name?', type: 'input' },
      { name: 'continue', question: 'Continue?', type: 'confirm' },
      { name: 'color', question: 'Which color', type: 'select', options: ['red', 'green', 'yellow'] }
    ];
    const answers = await prompt(questions);
    expect(answers).toEqual({
      name: 'Miguel',
      continue: true,
      color: 'green',
    });
  });
});

