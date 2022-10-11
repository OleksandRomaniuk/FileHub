import {AUTHORIZATION_FORM} from './constants.js';
import {validateAuthorization} from './validate-forms.js';

const formForAuthorization = document.getElementById(AUTHORIZATION_FORM);
validateAuthorization(formForAuthorization);
