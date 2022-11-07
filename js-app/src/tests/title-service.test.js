import {TitleService} from '../title-service.js';

describe('Title service', () => {
  test('Should create title on page', function() {
    expect.assertions(1);

    const titleService = new TitleService('Test', '/');

    titleService.title = ['title'];

    expect(document.title).toBe('Test / title');
  });

  test('Should throw error with incorrect main title argument', function() {
    expect.assertions(1);

    expect(() => new TitleService({}, '/'))
        .toThrow('Expected string but object provided.');
  });

  test('Should throw error with incorrect separator argument', function() {
    expect.assertions(1);

    expect(() => new TitleService('test', {}))
        .toThrow('Expected string but object provided.');
  });
});
