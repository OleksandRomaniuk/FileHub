import {Component} from '../components/component';
import {AuthorizationPage} from '../authorization/authorization-page';
import {RegistrationPage} from '../registration/registration-page';
import {ErrorComponent} from '../error/error';
import {Router} from './router';
import {TablePage} from '../main-table/table-page';
import {ApplicationContext} from './application-context';
import {RequestService} from '../service/request-service';
import {ApiService} from '../service/api-service';
import {SetMetadataAction} from '../actions/set-metadata-action';

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
    const requestService = new RequestService();
    const apiService = new ApiService(requestService);

    const applicationContext = new ApplicationContext();

    const router = Router.getBuilder()
        .addPage('login', () => {
          this.rootElement.innerHTML = '';
          const page = new AuthorizationPage(this.rootElement, applicationContext.titleService, apiService);
          page.onNavigateToRegistration(() => {
            router.redirect('registration');
          });
          page.onSubmit(()=>{
            router.redirect('file-list/');
          });
        })
        .addPage('registration', () => {
          this.rootElement.innerHTML = '';
          const page = new RegistrationPage(this.rootElement, applicationContext.titleService, apiService);
          page.onNavigateToLogin(() => {
            router.redirect('login');
          });
          page.onSubmit(()=>{
            router.redirect('file-list');
          });
        })
        .addPage('file-list/:folderId', () => {
          this.rootElement.innerHTML = '';
          const tablePage = new TablePage(this.rootElement, applicationContext);
          tablePage.onNavigateToFolder((id)=>{
            router.redirect(`file-list/` + id);
          });
        })
        .addRouteChangeListener((routerMetaData) => {
          if (routerMetaData.folderId) {
            applicationContext.stateManagementService.dispatch(new SetMetadataAction({
              folderId: routerMetaData.folderId,
            }));
          }
        })
        .setDefaultPage('registration')
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
