import {FileList} from '../../components/file-list.js';

describe('File List', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render table in loading state', () => {
    expect.assertions(1);

    new FileList(fixture, {isFileListLoading: true});

    expect(fixture.innerHTML).toBe(`<div class="file-table-wrapper">
                <table class="file-table">
                    <tbody data-td="file-list"><div class="file-table-wrapper table-state">
              <div class="table-loading">
                  <span class="glyphicon glyphicon-loader" aria-hidden="true"></span>
              </div>
            </div></tbody>
                </table>
            </div>`);
  });

  test('Should render table in error state', () => {
    expect.assertions(1);

    new FileList(fixture, {errorMessage: 'Test error'});

    expect(fixture.innerHTML).toBe(`<slot data-td="file-list"><div class="file-table-wrapper table-state">
                <div class="error-label table-error-label">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span>Test error</span>
                </div>
            </div></slot>`);
  });

  test('Should render folder inside table', () => {
    expect.assertions(3);

    new FileList(fixture, {fileListEntities: [
      {name: 'Folder', type: 'Folder', size: null}]});

    expect(fixture.querySelector('.entity-name').textContent.trim()).toBe('Folder');
    expect(fixture.querySelector('.mime-type').textContent.trim()).toBe('Folder');
    expect(fixture.querySelector('.file-size').textContent.trim()).toBe('—');
  });

  test('Should render file inside table', () => {
    expect.assertions(3);

    new FileList(fixture, {fileListEntities: [
      {name: 'File', type: 'jpg', size: '32 Mb'}]});

    expect(fixture.querySelector('.entity-name').textContent.trim()).toBe('File');
    expect(fixture.querySelector('.mime-type').textContent.trim()).toBe('jpg');
    expect(fixture.querySelector('.file-size').textContent.trim()).toBe('32 Mb');
  });
});
