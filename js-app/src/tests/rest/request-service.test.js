import {RequestService} from '../../rest/request-service.js';
import {jest} from '@jest/globals';
import {Response} from '../../rest/response.js';

describe('Request service', () => {
  test('Should call fetch method.', async function() {
    expect.assertions(3);
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({data: 'responseBody'});
        },
      });
    });

    const data = '{"data":"testName"}';

    const requestService = new RequestService();
    const postJsonResult = await requestService.postJson('test/url', data);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(
        'test/url',
        {'body': data,
          'headers': {'Content-Type': 'application/json;charset=utf-8'},
          'method': 'POST'});
    expect(postJsonResult).toEqual(new Response(200, {data: 'responseBody'}));
  });

  test('Should call fetch method in getJson.', async function() {
    expect.assertions(4);
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({error: 'errors'});
        },
      });
    });

    const data = 'token';

    const requestService = new RequestService();
    const getJsonResult = await requestService.getJson('test/url', data);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenLastCalledWith(
        'test/url',
        {
          'headers': {'Content-Type': 'application/json;charset=utf-8', 'Authorization': 'Bearer token'},
          'method': 'GET'});
    expect(getJsonResult.code).toBe(200);
    expect(getJsonResult.body).toEqual({error: 'errors'});
  });
});
