import {RequestService} from '../../service/request-service';
import {jest} from '@jest/globals';


describe('Request service', () => {
  test('Should response.', () => {
    expect.assertions(4);
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
        json: () => Promise.resolve({username: 'email@gfb', password: 'pas6tyhgdfxvd'}),
      };
    });

    const requestService = new RequestService();
    const url = 'url';
    const token = 'token';
    const response = requestService.get(url, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }});
    return response.then((response)=>{
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({
        'password': 'pas6tyhgdfxvd',
        'username': 'email@gfb',
      });
    });
  });
  test('Should response RequestService on get method without body.', () => {
    expect.assertions(4);
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
        json: async ()=>{},
      };
    });

    const requestService = new RequestService();
    const url = 'url';
    const token = 'token';
    const response = requestService.get(url, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }});
    return response.then((response)=>{
      expect(response.status).toBe(200);
      expect(response.body).toBeUndefined();
    });
  });
  test('Should catch error during post when status 401.', async () => {
    expect.assertions(3);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        json: () => Promise.resolve({username: 'email@gfb', password: 'pas6tyhgdfxvd'}),
      }));
    const requestService = new RequestService();
    const url = 'url';
    const token = 'token';
    const data = JSON.stringify({username: 'email@gfb', password: 'pas6tyhgdfxvd'});
    const response = requestService.post(url, data, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=utf-8'},
    });
    return response.then((response)=> {
      expect(response.status).toBe(401);
    });
  });
  test('Should call method post when status 200', async () => {
    expect.assertions(4);
    const data = {username: 'email@gfb', password: 'pas6tyhgdfxvd'};
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: async () => {
          return data;
        }}));
    const requestService = new RequestService();
    const url = 'url';
    const token = 'token';
    const response = requestService.post(url, data, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=utf-8'},
    });
    return response.then((response)=> {
      expect(response.status).toBe(200);
      expect(response.body).toBe(data);
    });
  });
  test('Should response RequestService on post method without body.', () => {
    expect.assertions(3);
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
        json: async ()=>{
          throw new Error();
        },
      };
    });

    const requestService = new RequestService();
    const url = 'url';
    const data = JSON.stringify({username: 'email@gfb', password: 'pas6tyhgdfxvd'});
    const response = requestService.post(url, {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    return response.then((response)=>{
      expect(response.status).toBe(200);
      expect(response.body).toBeUndefined();
    });
  });
  test('Should call method delete and return response.', ()=>{
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
      };
    });
    const url = 'file/file5';
    const token = 'token';
    const requestService = new RequestService();
    const responsePromise = requestService.delete(url, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return responsePromise.then((respone)=>{
      expect(respone.status).toBe(200);
      expect(respone.body).toStrictEqual(undefined);
    });
  });
  test('Should call method postFormData and return response.', ()=>{
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
      };
    });
    const url = 'url';
    const data = 'data';
    const token = 'token';
    const requestService = new RequestService();
    const responsePromise = requestService.postFormData(url, data, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
    return responsePromise.then((respone)=>{
      expect(respone.status).toBe(200);
      expect(respone.body).toStrictEqual(undefined);
    });
  });
  test('Should call method put and return response.', ()=>{
    const body = 'testBody';
    global.fetch = jest.fn(async () =>{
      return {
        status: 200,
        json: async ()=>{
          return body;
        },
      };
    });
    const url = 'url';
    const data = 'data';
    const token = 'token';
    const requestService = new RequestService();
    const responsePromise = requestService.put(url, data, token);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'PUT',
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return responsePromise.then((respone)=>{
      expect(respone.status).toBe(200);
      expect(respone.body).toStrictEqual(body);
    });
  });
});
