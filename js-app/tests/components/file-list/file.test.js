import {File} from '../../../components/file-list/file';
import {jest} from '@jest/globals';
describe('File', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText when created File component.', ()=> {
    expect.assertions(1);
    new File(fixture, {
      type: 'file',
      name: 'Montenegro',
      size: '5 kb',
      id: '36',
    });
    expect(fixture.innerHTML).toBe(
        `<tr>
                    <td class="cell-arrow">

                    </td>
                    <td class="cell-icon">
                        <span class="glyphicon glyphicon-file" aria-hidden="true">
                        </span>
                    </td>
                    <td class="cell-name">
                        Montenegro
                    </td>
                    <td class="cell-type">
                        file
                    </td>
                    <td class="cell-size">
                        5 kb
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="blue-button">
                                <span class="glyphicon glyphicon-download" aria-hidden="true"></span>
                            </a>
                            <a href="#" class="red-button" data-td="link-delete">
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>

                    </td>
                </tr>`);
  });
  test('Should calls event after click on link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const file = new File(fixture, {
        type: 'file',
        name: 'Montenegro',
        size: '5 kb',
        id: '36',
      });
      const listener = jest.fn();
      file.onDelete(listener);
      const deleteLink = fixture.querySelector('[data-td="link-delete"]');
      deleteLink.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });
});
