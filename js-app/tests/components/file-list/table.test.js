import {Table} from '../../../components/file-list/table';
import {ApplicationContext} from '../../../application/application-context';
import {jest} from '@jest/globals';

describe('Table', () => {
  let fixture;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should change innerText where folderContent id defined.', ()=> {
    expect.assertions(1);
    const table = new Table(fixture);
    expect(table.markup()).toBe(
        `<slot> <div class="center-text grey-text">
                There are no files/directories created yet.
            </div></slot>`);
  });

  test('Should change innerText when state of the table is loading.', ()=> {
    expect.assertions(1);
    const table = new Table(fixture, true, false);
    expect(table.markup()).toBe(`<slot><div class="center-text loading-table">
                <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
            </div></slot>`);
  });

  test('Should change innerText when state of the table is error.', ()=> {
    expect.assertions(1);
    const table = new Table(fixture, false, true);
    expect(table.markup()).toBe(`<slot> <div class="center-text error-text">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Can't load directory data
            </div></slot>`);
  });

  test('Should set content creators.', ()=> {
    expect.assertions(2);
    const table = new Table(fixture, false, false);
    const mockFileCreator = jest.fn();
    const mockFolderCreator = jest.fn();
    table.setContentCreators([mockFileCreator], [mockFolderCreator]);
    expect(mockFileCreator).toHaveBeenCalled();
    expect(mockFolderCreator).toHaveBeenCalled();
  });
});
