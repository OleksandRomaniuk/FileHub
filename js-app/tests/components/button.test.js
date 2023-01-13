import {Button} from '../../components/button';


describe('ButtonComponent', ()=>{
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });

  test('Should return button', () => {
    expect.assertions(5);

    const button = new Button(fixture, 'ButtonTitle', 'ButtonTitle');
    expect(button.title).toEqual('ButtonTitle');
    const buttonHTML = fixture.querySelector('[data-td = "button"]');
    expect(buttonHTML).toBeDefined();
    expect(buttonHTML.title).toBe('ButtonTitle');
    const markup =
        `<button class="button primary" data-td="button" type="submit" title="ButtonTitle">ButtonTitle</button>`;
    expect(fixture.innerHTML).toEqual(markup);
    expect(button.markup()).toEqual(markup);
  });
});
