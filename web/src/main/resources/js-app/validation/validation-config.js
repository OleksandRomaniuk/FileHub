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

  /**
   * Returns instance of {@link FormValidationConfigBuilder}.
   * @returns {FormValidationConfigBuilder}
   */
  static getBuilder() {
    return new FormValidationConfigBuilder();
  }
}

/**
 * FormValidationConfigBuilder for {@link FormValidationConfig} with all fields.
 */
class FormValidationConfigBuilder {
  configs = new Map();

  /**
   * Add elements in Map.
   * @param {string} name
   * @param {Array} validators
   * @returns {FormValidationConfigBuilder}
   */
  addField(name, validators) {
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
}

