import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path'
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

jest.mock('path', () => {
  return {
    ...jest.requireActual('path'),
    join: jest.fn(),
  }
});

jest.mock('fs/promises', () => {
  return {
    ...jest.requireActual('fs/promises'),
    readFile: jest.fn(),
  }
});

jest.mock('fs', () => {
  return {
    ...jest.requireActual('fs'),
    existsSync: jest.fn(),
  }
});

const mockJoin = join as jest.Mock
const mockReadFile = readFile as jest.Mock
const mockExistsSync = existsSync as jest.Mock

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const func = jest.fn()
    const spy = jest.spyOn(global, 'setTimeout')
    doStuffByTimeout(func, 1)
    expect(spy).toBeCalledWith(func, 1);
  });

  test('should call callback only after timeout', () => {
    const func = jest.fn();

    doStuffByTimeout(func, 1)

    expect(func).not.toBeCalled();

    jest.runAllTimers();

    expect(func).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const func = jest.fn()
    const spy = jest.spyOn(global, 'setInterval')
    doStuffByInterval(func, 1)
    expect(spy).toBeCalledWith(func, 1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const func = jest.fn();

    doStuffByInterval(func, 1)

    expect(func).not.toBeCalled();

    jest.advanceTimersByTime(3);

    expect(func).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = '/file'
    await readFileAsynchronously(pathToFile)
    expect(mockJoin).toBeCalledWith(__dirname, pathToFile)
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValue(false)
    const result = await readFileAsynchronously('')
    expect(result).toBeNull()
  });

  test('should return file content if file exists', async () => {
    mockExistsSync.mockReturnValue(true)
    mockReadFile.mockReturnValue('hello from file' as unknown as Buffer)
    const result = await readFileAsynchronously('')
    expect(result).toEqual('hello from file')
  });
});
