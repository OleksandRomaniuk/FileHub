import {State} from '../../state/state.js';
import {mutators} from '../../mutators/mutators.js';

describe('Mutators', () => {
  test('Should return state with new username', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-user-profile'](state, {username: 'test name'});

    expect(newState).not.toEqual(state);
    expect(newState.userProfile).toEqual({username: 'test name'});
  });

  test('Should return state with new error message', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-user-error'](state, 'test error');

    expect(newState).not.toEqual(state);
    expect(newState.userError).toBe('test error');
  });

  test('Should return zeroed profile states when loading is true', () => {
    expect.assertions(4);

    const state = new State();

    const newState = mutators['set-user-loading'](state, true);

    expect(newState).not.toEqual(state);
    expect(newState.userError).toBe('');
    expect(newState.userProfile).toBeNull();
    expect(newState.isUserLoading).toBe(true);
  });

  test('Should return state with new current folder field', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-current-folder'](state, {parentId: '1'});

    expect(newState).not.toEqual(state);
    expect(newState.currentFolder).toEqual({parentId: '1'});
  });

  test('Should return state with new breadcrumb error', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-breadcrumb-error'](state, 'Test error');

    expect(newState).not.toEqual(state);
    expect(newState.breadcrumbError).toBe('Test error');
  });

  test('Should return state with false breadcrumb loading', () => {
    expect.assertions(1);

    const state = new State();

    const newState = mutators['is-breadcrumb-loading'](state, false);

    expect(newState.isBreadcrumbLoading).toBe(false);
  });

  test('Should return zeroed breadcrumb states when loading is true', () => {
    expect.assertions(3);

    const state = new State();

    const newState = mutators['is-breadcrumb-loading'](state, true);

    expect(newState.breadcrumbError).toBe('');
    expect(newState.currentFolder).toBeNull();
    expect(newState.isBreadcrumbLoading).toBe(true);
  });

  test('Should return state with new file list error', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-file-list-error'](state, 'Test error');

    expect(newState).not.toEqual(state);
    expect(newState.fileListError).toBe('Test error');
  });

  test('Should return state with new folder content', () => {
    expect.assertions(2);

    const state = new State();

    const newState = mutators['set-folder-content'](state, 'Test content');

    expect(newState).not.toEqual(state);
    expect(newState.folderContent).toBe('Test content');
  });

  test('Should return zeroed file list states when loading is true', () => {
    expect.assertions(3);

    const state = new State();

    const newState = mutators['set-file-list-loading'](state, true);

    expect(newState.fileListError).toBe('');
    expect(newState.folderContent).toBeNull();
    expect(newState.isFileListLoading).toBe(true);
  });

  test('Should return state with false file list loading', () => {
    expect.assertions(1);

    const state = new State();

    const newState = mutators['set-file-list-loading'](state, false);

    expect(newState.isFileListLoading).toBe(false);
  });
});
