import {Component} from '../../components/component.js';

const TEST_LISTENER = ()=>{};

/**
 * Class for testing sequence of actions in Component.
 */
class ComponentTest extends Component {
  #messages = [];

  /**
   * @returns {string[]}
   */
  get messages() {
    return this.#messages;
  }

  /**
   * @param {HTMLElement}parent
   */
  constructor(parent) {
    super(parent);
    this.#messages.push('constructor');
    this.init();
    this.addListeners({field: 'testField', listener: TEST_LISTENER});
  }

  /**
   * @inheritDoc
   */
  afterRender() {
    this.#messages.push('afterRender');
  }

  /**
   * @inheritDoc
   */
  markup() {
    this.#messages.push('markup');
    return `<div class="test"></div>>`;
  }
}


describe('Component', () => {
  let fixture;

  beforeEach(() => {
    fixture = document.body;
    fixture.innerHTML = '';
  });


  test('Should return sequence of actions', async function() {
    expect.assertions(3);
    const component = new ComponentTest(fixture);
    const messages = component.messages.join(', ');
    expect(messages).toEqual(`constructor, markup, afterRender`);
    expect(component.markup()).toBe(`<div class="test"></div>>`);
    expect(component.listeners).toStrictEqual([{field: 'testField', listener: TEST_LISTENER}]);
  });
});
