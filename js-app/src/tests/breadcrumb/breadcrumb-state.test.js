import {jest} from '@jest/globals';
import {BreadcrumbState} from '../../breadcrumb/breadcrumb-state.js';

describe('Breadcrumb state', () => {
  let fixture;
  let stateManagementService;
  let applicationContext;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
    stateManagementService = {addStateListener() {}, dispatch() {}, get state() {}};
    applicationContext = {stateManagementService: stateManagementService, apiService: {}};
  });

  test('Should call creator with right arguments when loading is true', () => {
    expect.assertions(2);

    const credentials = {
      isBreadcrumbLoading: true,
      breadcrumbError: '',
      currentFolder: null};

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new BreadcrumbState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="breadcrumb-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isBreadcrumbLoading: true,
      breadcrumbError: '',
      currentFolder: null});
  });

  test('Should call creator with right arguments when error was occurred', () => {
    expect.assertions(2);

    const credentials = {
      isBreadcrumbLoading: false,
      breadcrumbError: 'Test error',
      currentFolder: null};

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new BreadcrumbState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="breadcrumb-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isBreadcrumbLoading: false,
      breadcrumbError: 'Test error',
      currentFolder: null});
  });

  test('Should call creator with right arguments with current folder data', () => {
    expect.assertions(2);

    const credentials = {
      isBreadcrumbLoading: false,
      breadcrumbError: '',
      currentFolder: {data: 'Test data'}};

    jest.spyOn(stateManagementService, 'addStateListener')
        .mockImplementation((field, executor) => {
          executor(credentials);
        });

    jest.spyOn(stateManagementService, 'state', 'get')
        .mockImplementation(() => {
          return credentials;
        });

    jest.spyOn(stateManagementService, 'dispatch')
        .mockImplementation(() => {});

    const creatorMock = jest.fn();

    new BreadcrumbState(fixture, applicationContext, creatorMock);

    const slot = fixture.querySelector('[data-td="breadcrumb-content"]');

    expect(creatorMock).toHaveBeenCalledTimes(1);
    expect(creatorMock).toHaveBeenNthCalledWith(1, slot, {isBreadcrumbLoading: false,
      breadcrumbError: '',
      currentFolder: {data: 'Test data'}});
  });
});
