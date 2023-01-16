import {Breadcrumb} from '../../components/breadcrumb';
import {jest} from '@jest/globals';

describe('Breadcrumb', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });
  test('Should change innerText.', ()=> {
    expect.assertions(1);
    const path = [{name: 'Home'}, {name: '...'}, {name: 'trip'}];
    new Breadcrumb(fixture, path, false, false);
    expect(fixture.innerHTML).toBe(
      '<slot><li><slot data-td="breadcrumb-link-0"><a href="#" data-td="link" title="Home">Home</a></slot>' +
        '</li><li><slot data-td="breadcrumb-link-1"><a href="#" data-td="link" title="...">...</a></slot></li> <li>\n'+
        '                    trip\n' +
        '                </li></slot>');
  });
  test('Should change innerText when state is loading.', ()=> {
    expect.assertions(1);
    new Breadcrumb(fixture, null, true, false);
    expect(fixture.innerHTML).toBe(`<slot><li>
                    <span class="glyphicon glyphicon-repeat loading" aria-hidden="true">
                    </span>
                </li></slot>`);
  });
  test('Should change innerText when state is error.', ()=> {
    expect.assertions(1);
    new Breadcrumb(fixture, null, false, true);
    expect(fixture.innerHTML)
      .toBe(`<slot><span class="error-text">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                   Can't load user data
                </span></slot>`);
  });
  test('Should call listener on nNavigate event.', ()=> {
    expect.assertions(1);
    const breadcrumb = new Breadcrumb(fixture,
      [
        {name: 'Home', id: 'homeId'},
        {name: '...', id: 'secondId'},
        {name: 'lastFolder', id: 'lastFolderId'},
      ],
      false, false);
    const mockListener = jest.fn();
    breadcrumb.onNavigateToFolder(mockListener);
    const link = fixture.querySelector('[data-td="breadcrumb-link-0"] a');
    link.click();
    expect(mockListener).toHaveBeenCalled();
  });
  test('Should give path during error state.', ()=> {
    expect.assertions(1);
    const breadcrumb = new Breadcrumb(fixture,
      [
        {name: 'Home', id: 'homeId'},
        {name: '...', id: 'secondId'},
        {name: 'lastFolder', id: 'lastFolderId'},
      ],
      false, true);
    const mockListener = jest.fn();
    breadcrumb.onNavigateToFolder(mockListener);
    const link = fixture.querySelector('[data-td="breadcrumb-link-0"] a');
    expect(link).toBeNull();
  });
});
