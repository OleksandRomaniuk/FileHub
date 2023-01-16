import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';
import {State} from '../../../service/state-management/state';
import {registry} from '../../../application/registry';
import {PanelWrapper} from '../../../components/wrappers/panel-wrapper';

describe('PanelWrapper', () => {
  let fixture;
  let eventTarget;

  beforeEach(() => {
    eventTarget = new EventTarget();
    fixture = document.body;
    fixture.innerHTML = '';
    new ApplicationContext();
  });

  test('Should change markup when get data about userProfile.', ()=> {
    expect.assertions(1);
    const stateManagementService = registry.getInstance('stateManagementService');
    jest
      .spyOn(stateManagementService, 'addStateListener')
      .mockImplementation((fieldName, listener)=> {
        eventTarget.addEventListener(`stateChanged.${fieldName}`,
          (event) => listener(event.detail));
      });
    jest
      .spyOn(stateManagementService, 'dispatch')
      .mockImplementation(()=> {});
    const panelWrapper = new PanelWrapper(fixture);
    const mockRender = jest
      .spyOn(panelWrapper, 'render')
      .mockImplementation(()=>{});
    const folderId = 'testFolderId';
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.uploadingFiles',
        {detail: new State({
          uploadingFiles: {
            folderId: folderId,
          },
          locationMetaData: {
            folderId: folderId,
          },
        })},
      ));
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.fileUploadError',
        {detail: new State({
          fileUploadError: {
            folderId: folderId,
          },
          locationMetaData: {
            folderId: folderId,
          },
        })},
      ));
    eventTarget.dispatchEvent(
      new CustomEvent('stateChanged.locationMetaData',
        {detail: new State({
          fileUploading: {
            folderId: folderId,
          },
          locationMetaData: {
            folderId: folderId,
          },
          fileUploadError: {
            folderId: folderId,
          },
        })},
      ));

    expect(mockRender).toHaveBeenCalledTimes(3);
  });
  test('Should call panelCreator.', ()=> {
    expect.assertions(2);
    const panelWrapper = new PanelWrapper(fixture);
    panelWrapper.panelCreator = (slot, fileUploading, fileUploadError) =>{
      expect(fileUploading).toBeUndefined();
      expect(fileUploadError).toBeUndefined();
    };
  });
});
