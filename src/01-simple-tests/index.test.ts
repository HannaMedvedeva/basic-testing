// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toEqual(4)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toEqual(0)
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toEqual(6)

  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toEqual(1)
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toEqual(8)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'baka' })).toEqual(null)
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'Naruto', b: 'Saske', action: 'disarm' })).toEqual(null)
  });
});
