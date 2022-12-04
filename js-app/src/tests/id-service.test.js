import {IdService} from '../services/id-service.js';

describe('Id service', () => {
  test('Should create unique id', function() {
    expect.assertions(1);

    const generatedIds = [];

    for (let i = 0; i < 100; i++) {
      generatedIds.push(IdService.getId());
    }

    const resultToReturn = generatedIds.some((element, index) => {
      return generatedIds.indexOf(element) !== index;
    });

    expect(resultToReturn).toBe(false);
  });
});
