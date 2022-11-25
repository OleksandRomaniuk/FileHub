import {State} from '../../state/state.js';

describe('State', () => {
  test('Should set right properties to State', () => {
    expect.assertions(1);

    const state = new State(
        {isUserLoading: true, userProfile: 'Name', userError: 'Error'});

    expect(state).toEqual(
        {isUserLoading: true,
          userProfile: 'Name',
          userError: 'Error',
          breadcrumbError: '',
          currentFolder: null,
          isBreadcrumbLoading: true,
          fileListError: '',
          folderContent: null,
          isFileListLoading: true,
        });
  });

  test('Should ignore unknown properties at initialising', () => {
    expect.assertions(1);

    const state = new State({isUserLoading: true, userProfile: 'Name', unknownProperty: ''});

    expect(state).toEqual({isUserLoading: true,
      userProfile: 'Name',
      userError: '',
      breadcrumbError: '',
      currentFolder: null,
      isBreadcrumbLoading: true,
      fileListError: '',
      folderContent: null,
      isFileListLoading: true,
    });
  });

  test('Should freeze state at initialisation', () => {
    const state = new State();

    expect(Object.isFrozen(state)).toBe(true);
  });
});
