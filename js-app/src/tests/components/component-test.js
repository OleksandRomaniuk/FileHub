import {Component} from '../../components/component.js';

const {module, test} = QUnit;

module('Base component', () => {
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

  test('Should be right lifecycle of component', function(assert) {
    assert.expect(3);

    const fixture = document.getElementById('qunit-fixture');

    const componentSpy = new ComponentSpy(fixture);

    const methodCycleChecker = componentSpy.methodCycleChecker;

    assert.strictEqual(methodCycleChecker[0], 'init', 'Should execute init method first');
    assert.strictEqual(methodCycleChecker[1], 'render', 'Should execute render method first');
    assert.strictEqual(methodCycleChecker[2], 'afterRender', 'Should execute afterRender method first');
  });
});
