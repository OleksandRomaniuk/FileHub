/**
 * Contains configs with field and validators for fields that returns promises.
 */
export class FormValidationConfig {
  configs;

  /**
   * @param {Map} configs
   */
  constructor(configs) {
    this.configs = configs;
  }

  static Builder = class {
    configs = new Map();

    /**
     * Add elements in Map.
     * @param {string} name
     * @param {array} validators
     * @returns {FormValidationConfig.Builder}
     */
    addFields(name, validators) {
      this.configs.set(name, validators);
      return this;
    }

    /**
     * Builds new object of FormValidationConfig.
     * @returns {FormValidationConfig}
     */
    build() {
      return new FormValidationConfig(this.configs);
    }
  };
}
