import {ButtonPanel} from '../../components/button-panel';
import {jest} from '@jest/globals';

describe('ButtonPanel', ()=>{
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should return button panel with usual state', () => {
    expect.assertions(1);
    new ButtonPanel(fixture);
    expect(fixture.innerHTML).toBe('<div class="buttons">\n' +
        '                <slot data-td="upload-button"><button class="button primary" data-td="button" ' +
        'type="submit" title="upload"><span class="glyphicon glyphicon-upload" aria-hidden="true">' +
        '</span></button></slot>\n' +
        '                <slot data-td="create-folder-button"><button class="button primary" data-td="button" ' +
        'type="submit" title="Create new folder"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span><' +
        '/button></slot>\n' +
        '            </div>');
  });

  test('Should return button panel with loading upload state', () => {
    expect.assertions(1);
    new ButtonPanel(fixture, true, null);
    const button = fixture.querySelector('[data-td="upload-button"] button');
    expect(button.innerHTML).toBe(
      '<span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>');
  });

  test('Should return button panel with upload error', () => {
    expect.assertions(1);
    new ButtonPanel(fixture, false, 'error');
    const button = fixture.querySelector('[data-td="upload-button"] button');
    expect(button.innerHTML).toBe(
      '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>');
  });

  test('Should dispatch event when click on upload button', () => {
    expect.assertions(1);
    const buttonPanel = new ButtonPanel(fixture);
    const mockUpload = jest.fn();
    buttonPanel.onUpload(mockUpload);
    const uploadButton = fixture.querySelector('[data-td="upload-button"] button');
    uploadButton.click();
    expect(mockUpload).toHaveBeenCalled();
  });
});
