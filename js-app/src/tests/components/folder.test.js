import {Folder} from '../../components/folder.js';

describe('Folder', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render table row for folder', () => {
    expect.assertions(1);

    new Folder(fixture, 'FolderName');

    expect(fixture.innerHTML).toBe(`<tr>
              <td class="open-icon"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></td>
              <td class="mime-type-icon"><span class="glyphicon glyphicon-folder-close" aria-hidden="true"></span></td>
              <td class="entity-name">
                <a class="name" href="#">FolderName</a>
              </td>
              <td class="mime-type">Folder</td>
              <td class="file-size">—</td>
              <td class="table-buttons">
                <a href="#"><span class="glyphicon glyphicon-upload upload-link" aria-hidden="true"></span></a>
                <a href="#"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a>
              </td>
              </tr>`);
  });
});
