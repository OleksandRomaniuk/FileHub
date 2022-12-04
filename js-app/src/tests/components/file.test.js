import {File} from '../../components/file.js';

describe('File component', () => {
  let fixture;

  beforeEach(() => {
    document.body.innerHTML = '';
    fixture = document.body;
  });

  test('Should render table row for file', () => {
    expect.assertions(1);

    new File(fixture, {name: 'File', size: '20', type: 'avi'});

    expect(fixture.innerHTML).toBe(`<tr>
             <td class="open-icon"></td>
             <td class="mime-type-icon"><span class="glyphicon undefined" aria-hidden="true"></span></td>
             <td class="entity-name">
                <p class="name">File</p>
             </td>
             <td class="mime-type">avi</td>
             <td class="file-size">20</td>
             <td class="table-buttons">
                 <a href="#"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>
                 <a href="#"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></a>
             </td>
             </tr>`);
  });
});
