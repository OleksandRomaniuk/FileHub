import {Component} from '../../components/component.js';

describe('Base component', () => {
  /**
   * Test implementation of {@link Component}.
   */
  class ComponentSpy extends Component {
    #methodCycleChecker = [];

    /**
     * @param {HTMLElement} parent
     */
    constructor(parent) {
      super(parent);
      this.init();
    }

    /**
     * @returns {string[]}
     */
    get methodCycleChecker() {
      return this.#methodCycleChecker;
    }

    /**
     * @inheritDoc
     */
    afterRender() {
      this.#methodCycleChecker.push('afterRender');
    }

    /**
     * @inheritDoc
     */
    init() {
      this.#methodCycleChecker.push('init');
      super.init();
    }

    /**
     * @inheritDoc
     */
    render() {
      this.#methodCycleChecker.push('render');
      super.render();
    }

    /**
     * @inheritDoc
     * @returns {string}
     */
    markup() {
      return `<slot></slot>`;
    }
  }

  test('Should be right lifecycle of component', function() {
    expect.assertions(3);

    document.body.innerHTML = '';

    const componentSpy = new ComponentSpy(document.body);

    const methodCycleChecker = componentSpy.methodCycleChecker;

    expect(methodCycleChecker[0]).toBe('init');
    expect(methodCycleChecker[1]).toBe('render');
    expect(methodCycleChecker[2]).toBe('afterRender');
  });
});
