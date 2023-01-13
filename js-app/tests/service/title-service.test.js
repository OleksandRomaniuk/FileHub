import {TitleService} from '../../service/title-service';

describe('TitleService', () => {
  test('Should return title', () => {
    expect.assertions(1);
    const titleService = new TitleService('FileHub', '-');
    titleService.setTitle(['second']);
    expect(titleService.getTitle()).toBe('FileHub-second');
  });
});
