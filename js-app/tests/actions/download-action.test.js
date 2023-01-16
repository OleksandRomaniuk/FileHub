import {ApplicationContext} from '../../application/application-context';
import {jest} from '@jest/globals';
import {MUTATOR_NAME} from '../../service/state-management/constatns/mutators';
import {registry} from '../../application/registry';
import {DownloadAction} from '../../actions/download-action';

describe('DownloadAction', () => {
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(4);
    new ApplicationContext();
    const downloadService = registry.getInstance('downloadService');
    const apiServiceMock = jest
      .spyOn( downloadService, 'download')
      .mockImplementation(async ()=>{});
    const item = {
      type: 'file',
      name: 'work.pdf',
    };
    const executor = jest.fn(()=>{});
    const downloadAction = new DownloadAction(item);
    return downloadAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(2);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, {item: item});
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, null);
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const downloadService = registry.getInstance('downloadService');
    const apiServiceMock = jest
      .spyOn( downloadService, 'download')
      .mockImplementation(async ()=>{
        throw new Error();
      });
    const item = {
      type: 'file',
      id: 'testId',
      name: 'work.pdf',
    };

    const executor = jest.fn(()=>{});
    const downloadAction = new DownloadAction(item);
    return downloadAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);

      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, {item: item});
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_DOWNLOAD_ERROR, {
        error: new Error(),
        itemId: item.id,
      });
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_ITEM_IN_DOWNLOAD_STATE, null);
    });
  });
});
