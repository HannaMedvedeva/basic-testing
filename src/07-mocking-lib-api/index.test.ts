import { throttledGetDataFromApi } from './index'
import axios from 'axios'

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create')
    await throttledGetDataFromApi('/')
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  })

  test('should perform request to correct provided url', async () => {
  })

  test('should return response data', async () => {
  })
})
