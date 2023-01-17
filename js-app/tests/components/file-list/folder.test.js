import {Folder} from '../../../components/file-list/folder';
import {jest} from '@jest/globals';
import {ApplicationContext} from '../../../application/application-context';

describe('Folder', () => {
  let fixture;

  beforeEach(() => {
    new ApplicationContext();
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText when created File component.', ()=> {
    expect.assertions(1);
    new Folder(fixture, {
      type: 'folder',
      name: 'Montenegro',
      size: null,
      id: '36',
    });
    expect(fixture.innerHTML).toBe(
        `<tr>
                    <td class="cell-arrow">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    </td>
                    <td class="cell-icon">
                       <span class="glyphicon glyphicon-folder-close" aria-hidden="true">
                       </span>
                    </td>
                    <td class="cell-name folder">
                    <slot data-td="link-slot-folder"><a href="#" data-td="link" title="Montenegro">Montenegro</a></slot>
                    </td>
                    <td class="cell-type">
                        Folder
                    </td>
                    <td class="cell-size">
                        —
                    </td>
                    <td class="cell-buttons">
                        <div class="button-hidden">
                            <a href="#" class="green-button">
                                <span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
                            </a>
                            <a href="#" class="red-button" data-td="link-delete">
                                <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                            </a>
                        </div>
                    </td>
                </tr>`);
  });
  test('Should calls event after click on removing link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: '36',
      });
      const listener = jest.fn();
      folder.onDelete(listener);
      const deleteLink = fixture.querySelector('[data-td="link-delete"]');
      deleteLink.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });
  test('Should calls event after click on folder link.', ()=> {
    return new Promise((done) => {
      expect.assertions(1);
      const folder = new Folder(fixture, {
        type: 'folder',
        name: 'Montenegro',
        size: null,
        id: '36',
      });
      const listener = jest.fn();
      folder.onNavigateToFolder(listener);
      const link = fixture.querySelector('[data-td="link-slot-folder"] a');
      link.click();
      setTimeout(()=>{
        expect(listener).toHaveBeenCalled();
        done();
      });
    });
  });
});
