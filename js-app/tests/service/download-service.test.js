import {jest} from '@jest/globals';
import {ApplicationContext} from '../../application/application-context';
import {DownloadService} from '../../service/download-service';
import {registry} from '../../application/registry';

describe('DownloadService', () => {
  test('Should.', async () => {
    new ApplicationContext();
    expect.assertions(2);
    const downloadService = new DownloadService();
    const apiService = registry.getInstance('apiService');
    const data ={
      name: 'tmpName',
    };
    jest
      .spyOn(apiService, 'download')
      .mockImplementation(async ()=>data);
    const createElementSpy = jest.spyOn(document, 'createElement');
    window.URL.createObjectURL = ()=>'tmpHref';
    await expect(downloadService.download(data)).resolves.toBeUndefined();
    const link = createElementSpy.mock.results[0].value;
    expect(link.href).toBeDefined();
  });
});
