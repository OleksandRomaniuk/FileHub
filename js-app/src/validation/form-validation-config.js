/**
 * FormValidationConfig was invented to define validation configuration for fields in forms.
 */
export class FormValidationConfig {
  #fieldValidators = {};

  /**
   * @param {{}} configs
   */
  constructor(configs) {
    this.#fieldValidators = configs;
  }

  /**
   * Provides access to fieldValidators object.
   * @returns {{}}
   */
  getFieldValidators() {
    return this.#fieldValidators;
  }

  /**
   * Provide access to builder.
   * @returns {FormValidationConfigBuilder}
   */
  static getBuilder() {
    return new FormValidationConfigBuilder();
  }
}

/**
 * {@code FormValidationConfigBuilder} was invented
 * as a realisation of builder pattern builder
 * for simple defining {@link FormValidationConfig}.
 */
export class FormValidationConfigBuilder {
  #configs = {};

  /**
   * Add field for validation configuration.
   * @param {string} name
   * @param {Promise<any>[]} validators
   * @returns {FormValidationConfigBuilder}
   */
  addField(name, validators) {
    this.#configs[name] = validators;
    return this;
  }

  /**
   * @returns {FormValidationConfig}
   */
  build() {
    return new FormValidationConfig(this.#configs);
  }
}
