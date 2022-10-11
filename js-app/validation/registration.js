import {validateRegistration} from './validate-forms.js';
import {REGISTRATION_FORM} from './constants.js';


const formForRegistration = document.getElementById(REGISTRATION_FORM);
validateRegistration(formForRegistration);
