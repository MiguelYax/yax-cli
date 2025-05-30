import { Prompt } from '../src/prompt';

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

describe('Prompt', () => {
  let prompt: Prompt;

  beforeEach(() => {
    prompt = new Prompt();
    questionMock.mockReset();
  });

  afterEach(() => {
    prompt.close();
  });

  it('should return input answer', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('test answer'));
    await expect(prompt.input('Your name?')).resolves.toBe('test answer');
  });

  it('should return true for confirm yes', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('y'));
    await expect(prompt.confirm('Continue?')).resolves.toBe(true);
  });

  it('should return false for confirm no', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('n'));
    await expect(prompt.confirm('Continue?')).resolves.toBe(false);
  });

  it('should select the correct option', async () => {
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => cb('2'));
    await expect(prompt.select('Pick one', ['a', 'b', 'c'])).resolves.toBe('b');
  });

  it('should retry select on invalid input', async () => {
    let call = 0;
    questionMock.mockImplementation((q: string, cb: (v: string) => string) => {
      call++;
      if (call === 1) cb('5');
      else cb('1');
    });
    await expect(prompt.select('Pick one', ['a', 'b'])).resolves.toBe('a');
  });

  it('should close readline interface', () => {
    const closeMock = prompt['rl'].close as jest.Mock;
    prompt.close();
    expect(closeMock).toHaveBeenCalled();
  });
});
