import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  return {
    ...jest.requireActual('./index'),
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  }
});

const mockMockOne = mockOne as jest.Mock
const mockMockTwo = mockTwo as jest.Mock
const mockMockThree = mockThree as jest.Mock
console.log = jest.fn()

describe('partial mocking', () => {
  afterAll(() => {
    jest.clearAllMocks()
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockMockOne()
    mockMockTwo()
    mockMockThree()
    expect(console.log).not.toBeCalled()
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction()
    expect(console.log).toHaveBeenNthCalledWith(1, 'I am not mocked')
  });
});
