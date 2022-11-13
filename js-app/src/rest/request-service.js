import {Response} from './response.js';

/**
 * Service for sending requests to the server.
 */
export class RequestService {
  /**
   * Sends post request to the server. Can work only with JSON data type.
   * @param {string} url
   * @param {string} data
   * @returns {Promise<Response>}
   */
  async postJson(url, data) {
    let fetchResult;
    return await fetch(url, {
      method: 'POST',
      body: data,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    }).then(async (response) => {
      await response.json().then((data) => {
        fetchResult = new Response(response.status, data);
      });
      return fetchResult;
    });
  }

  /**
   * Get json.
   * @param {string} url
   * @param {string} userId
   * @returns {Promise<*>}
   */
  async getJson(url, userId) {
    let fetchResult;
    return await fetch(url+'?'+new URLSearchParams(userId), {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
    }).then(async (response) => {
      await response.json().then((data) => {
        fetchResult = new Response(response.status, data);
      });
      return fetchResult;
    });
  }
}
