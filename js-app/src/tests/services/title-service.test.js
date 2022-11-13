import {TitleService} from '../../services/title-service.js';

describe('Title service', () => {
  test('Should create title on page', function() {
    expect.assertions(1);

    const titleService = new TitleService('Test', '/');

    titleService.title = ['title'];

    expect(document.title).toBe('Test / title');
  });

  test('Should throw error with incorrect main title argument', function() {
    expect.assertions(1);

    try {
      new TitleService({}, '/');
    } catch (e) {
      expect(e.message).toBe('Expected string but object provided.');
    }
  });

  test('Should throw error with incorrect separator argument', function() {
    expect.assertions(1);

    try {
      new TitleService('test', {});
    } catch (e) {
      expect(e.message).toBe('Expected string but object provided.');
    }
  });
});
