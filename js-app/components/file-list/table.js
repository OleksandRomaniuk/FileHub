import {Component} from '../component';
import {FileTypeIconFactory} from './file-type-icon-factory';


/**
 * The component for generate file and folder list.
 */
export class Table extends Component {
    #isError;
    #isLoading;
    #fileTypeIconFactory;
    #folderCreators;
    #fileCreators;

    /**
     * @param {HTMLElement} parent
     * @param {boolean} isLoading
     * @param {boolean} isError
     */
    constructor(parent,
      isLoading,
      isError,
    ) {
      super(parent);
      this.#isLoading = isLoading;
      this.#isError = isError;
      this.#fileTypeIconFactory = new FileTypeIconFactory();
      this.init();
    }
    /**
     * @inheritDoc
     */
    afterRender() {
      const tableSlot = this.getSlot('table');
      if (tableSlot) {
        this.#folderCreators?.forEach((creator)=>{
          creator(tableSlot);
        });
        this?.#fileCreators?.forEach((creator)=> {
          creator(tableSlot);
        });
      }
    }

    /**
     * Set creators for folders and files.
     * @param {...function(HTMLElement): void} folderCreators
     * @param {...function(HTMLElement): void} fileCreators
     */
    setContentCreators(folderCreators, fileCreators) {
      this.#folderCreators = folderCreators;
      this.#fileCreators = fileCreators;
      this.render();
    }

    /**
     * @inheritDoc
     */
    markup() {
      let innerText;
      if (this.#isLoading) {
        innerText = `<div class="center-text loading-table">
                <span class="glyphicon glyphicon-repeat loading" aria-hidden="true"></span>
            </div>`;
      } else if (this.#isError) {
        innerText = ` <div class="center-text error-text">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                Can't load directory data
            </div>`;
      } else if (this.#folderCreators?.length > 0 || this.#fileCreators?.length > 0) {
        innerText = `<table class="all-elements"><tbody data-td="table"></tbody></table>`;
      } else {
        innerText = ` <div class="center-text grey-text">
                There are no files/directories created yet.
            </div>`;
      }
      return `<slot>${innerText}</slot>`;
    }
}
