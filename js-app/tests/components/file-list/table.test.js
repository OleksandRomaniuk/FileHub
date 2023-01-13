import {Table} from '../../../components/file-list/table';

describe('Table', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText where folderContent id defined.', ()=> {
    expect.assertions(1);
    const folderContent =
        {
          items: [
            {
              type: 'folder',
              name: 'Montenegro',
              size: null,
              id: '36',
            },
            {
              type: 'folder',
              name: 'My Trip',
              size: null,
              id: '37',
            },
            {
              type: 'PDF Document',
              name: 'HTML_guidelines.pdf',
              size: '100 KB',
              id: '38',
            },
          ],
        };
    const table = new Table(fixture, folderContent, false, false);
    expect(table.markup()).toBe(
        `<slot><table class="all-elements"><tbody data-td="table"></tbody></table></slot>`);
  });
  test('Should change innerText when state of the table is loading.', ()=> {
    expect.assertions(1);
    const table = new Table(fixture, null, true, false);
    expect(table.markup()).toBe(`<slot><div class="center-text loading-table">
                <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
            </div></slot>`);
  });
  test('Should change innerText when state of the table is error.', ()=> {
    expect.assertions(1);
    const table = new Table(fixture, null, false, true);
    expect(table.markup()).toBe(`<slot> <div class="center-text error-text">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Can't load directory data
            </div></slot>`);
  });
});
