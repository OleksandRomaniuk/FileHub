import {Component} from '../components/component';
import {AuthorizationPage} from '../authorization/authorization-page';
import {RegistrationPage} from '../registration/registration-page';
import {ErrorComponent} from '../error/error';
import {Router} from './router';
import {TablePage} from '../main-table/table-page';
import {ApplicationContext} from './application-context';
import {SetMetadataAction} from '../actions/set-metadata-action';
import {registry} from './registry';
import {ResetStateAction} from '../actions/reset-state-action';

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
    new ApplicationContext();

    const router = Router.getBuilder()
      .addPage('login', () => {
        this.rootElement.innerHTML = '';
        const page = new AuthorizationPage(this.rootElement);
        page.onNavigateToRegistration(() => {
          router.redirect('registration');
        });
        if (registry.getInstance('storage').getToken()) {
          router.redirect('file-list/');
        }
        page.onSubmit(()=>{
          router.redirect('file-list/');
        });
      })
      .addPage('registration', () => {
        this.rootElement.innerHTML = '';
        const page = new RegistrationPage(this.rootElement);
        page.onNavigateToLogin(() => {
          router.redirect('login');
        });
        page.onSubmit(()=>{
          router.redirect('file-list/');
        });
      })
      .addPage('file-list/:folderId', () => {
        this.rootElement.innerHTML = '';
        const tablePage = new TablePage(this.rootElement);
        tablePage.onNavigateToFolder((id)=>{
          router.redirect(`file-list/` + id);
        });
        tablePage.onSearch((name)=>{
          router.redirect(`file-list/${registry.getInstance('stateManagementService')
            .state.locationMetaData.dynamicParams.folderId}?search=${name}`);
        });
      })
      .addRouteChangeListener((routerMetaData) => {
        if (routerMetaData) {
          registry.getInstance('stateManagementService').dispatch(new SetMetadataAction(routerMetaData));
        }
      })
      .setDefaultPage('file-list/')
      .setErrorPageCreator(() => {
        this.rootElement.innerHTML = '';
        new ErrorComponent(this.rootElement);
      }).build();
    router.run();

    const apiService = registry.getInstance('apiService');
    apiService.onLogOut(()=>{
      registry.getInstance('stateManagementService').dispatch(new ResetStateAction());
      router.redirect('login');
    });
  }

  /**
   * @inheritDoc
   * @returns {string}
   */
  markup() {
    return `<slot></slot>`;
  }
}
