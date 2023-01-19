import {MUTATOR_NAME} from '../../../../../Downloads/FileHub-task-search/FileHub-task-search/js-app/service/state-management/constatns/mutators.js';
import {ApplicationContext} from '../../../../../Downloads/FileHub-task-search/FileHub-task-search/js-app/application/application-context.js';
import {jest} from '@jest/globals';
import {registry} from '../../../../../Downloads/FileHub-task-search/FileHub-task-search/js-app/application/registry.js';
import {SearchAction} from '../../../../../Downloads/FileHub-task-search/FileHub-task-search/js-app/actions/search-action.js';

describe('SearchAction', () => {
  test('Should call mutators when server gives data.', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn(apiService, 'getFolderContentByName')
      .mockImplementation(async ()=>{
        return {
          folderContent: {
            items: [
              {
                type: 'folder',
                name: 'Montenegro',
                size: null,
                id: '36',
              },
            ],
          },
        };
      });
    const executor = jest.fn(()=>{});
    const searchAction = new SearchAction('25', 'testName');
    return searchAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, true);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_FOLDER_CONTENT, {
        items: [
          {
            type: 'folder',
            name: 'Montenegro',
            size: null,
            id: '36',
          },
        ],
      });
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, false);
    });
  });
  test('Should call mutators when server returns error.', ()=> {
    expect.assertions(5);
    new ApplicationContext();
    const apiService = registry.getInstance('apiService');
    const apiServiceMock = jest
      .spyOn(apiService, 'getFolderContentByName')
      .mockImplementation(async ()=>{
        throw new Error();
      });
    const executor = jest.fn(()=>{});
    const searchAction = new SearchAction('25', 'testName');
    return searchAction.execute(executor).then(()=>{
      expect(apiServiceMock).toHaveBeenCalledTimes(1);
      expect(executor).toHaveBeenCalledTimes(3);
      expect(executor).toHaveBeenNthCalledWith(1, MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, true);
      expect(executor).toHaveBeenNthCalledWith(2, MUTATOR_NAME.SET_ERROR_FOLDER_CONTENT, true);
      expect(executor).toHaveBeenNthCalledWith(3, MUTATOR_NAME.SET_LOADING_FOLDER_CONTENT, false);
    });
  });
});
