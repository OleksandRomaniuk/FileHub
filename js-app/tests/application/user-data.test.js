import {UserData} from '../../application/user-data';

describe('UserData', () =>{
  test('Should check data from UserData', () => {
    expect.assertions(4);
    const userdata = new UserData('oleksnadr@gmail.com', 'password451441');

    expect(typeof userdata.email).toBe('string');
    expect(typeof userdata.password).toBe('string');
    expect(userdata.email).toBe('cherhynska@gmail.com');
    expect(userdata.password).toBe('password451441');
  });
});
