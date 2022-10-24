import {Component} from "../../components/component.js";


class ComponentChild extends Component {
    #messages = [];

    get messages(){
        return this.#messages;
    }


    constructor(parent) {
        super(parent);
        this.#messages.push('constructor');
        this.init();
    }
    init(){
        this.#messages.push('init');
        this.render();
    }
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

const {module, test} = QUnit;

module('component', () => {
    test('Should return sequence of actions', async function(assert) {
        assert.expect(1);
        const fixture = document.getElementById('qunit-fixture');
        debugger
        const component = new ComponentChild(fixture);
        const messages = component.messages.join(', ');
        assert.strictEqual(messages, `constructor, init, markup, afterRender`);
    });
});


