import {Component} from '../components/component.js';
import {AuthorizationPage} from '../authorization/authorization-page.js';
import {RegistrationPage} from '../registration/registration-page.js';
import {ErrorComponent} from '../error/error.js';
import {HashRouter} from './hashRouter.js';

/**
 * Creates router for moving on right components.
 */
export class Application extends Component {
    /**
     * @param {HTMLElement} parent
     */
    constructor(parent) {
        super(parent);
        this.init();
        console.log('this.rootElement')
        console.log(this.rootElement)
        HashRouter.getBuilder()
            .addPage('#login', () => {
                console.log(this.rootElement)
                this.rootElement.innerHTML = '';
                const page = new AuthorizationPage(this.rootElement);
                page.onNavigateToRegistration(() => {
                    HashRouter.redirect('#registration');
                });
            })
            .addPage('#registration', () => {
                this.rootElement.innerHTML = '';
                const page = new RegistrationPage(this.rootElement);
                page.onNavigateToLogin(() => {
                    HashRouter.redirect('#login');
                });
            })
            .setDefaultPage('#registration')
            .setErrorPageCreator(() => {
                this.rootElement.innerHTML = '';
                new ErrorComponent(this.rootElement);
            }).build();
    }

    /**
     * @inheritDoc
     * @returns {string}
     */
    markup() {
        return `<slot></slot>`;
    }
}
