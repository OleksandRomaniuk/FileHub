import {Response} from '../../service/response.js';


describe('Response', () => {
  test('Should response.', () => {
    expect.assertions(2);
    const response = new Response(200, {field: 'value'});
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({field: 'value'});
  });
});
