import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';
import { random } from 'lodash'

jest.mock('lodash', () => {
  return {
    ...jest.requireActual('lodash'),
    random: jest.fn(),
  }
})

const mockRandom = random as jest.Mock

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(123)
    expect(bankAccount.getBalance()).toEqual(123)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1)
    expect(() => bankAccount.withdraw(2)).toThrow(new InsufficientFundsError(bankAccount.getBalance()))
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1)
    const anotherAccount = getBankAccount(123)
    expect(() => bankAccount.transfer(2, anotherAccount)).toThrow(new InsufficientFundsError(bankAccount.getBalance()))
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1)
    expect(() => bankAccount.transfer(2, bankAccount)).toThrow(new TransferFailedError())
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1)
    bankAccount.deposit(1)
    expect(bankAccount.getBalance()).toEqual(2)
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(2)
    bankAccount.withdraw(1)
    expect(bankAccount.getBalance()).toEqual(1)
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(2)
    const anotherAccount = getBankAccount(3)
    bankAccount.transfer(2, anotherAccount)
    expect(bankAccount.getBalance()).toEqual(0)
    expect(anotherAccount.getBalance()).toEqual(5)

  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    mockRandom.mockReturnValue(1)
    const bankAccount = getBankAccount(0)
    const result = await bankAccount.fetchBalance()
    expect(result).toEqual(1)
  });

  test('should set new balance if fetchBalance returned number', async () => {
    mockRandom.mockReturnValue(1)
    const bankAccount = getBankAccount(0)
    await bankAccount.synchronizeBalance()
    expect(bankAccount.getBalance()).toEqual(1)
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    mockRandom.mockReturnValue(0)
    const bankAccount = getBankAccount(0)

    expect(async () => await bankAccount.synchronizeBalance()).rejects.toEqual(new SynchronizationFailedError())
  });
});
