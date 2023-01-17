const nameToClassCreator = new Map();
const nameToInstance = new Map();

export const registry = {
  register(name, componentCreator) {
    nameToClassCreator.set(name, componentCreator);
  },

  getInstance(name) {
    if (nameToInstance.has(name)) {
      return nameToInstance.get(name);
    }
    const componentClassCreator = nameToClassCreator.get(name);
    if (componentClassCreator === undefined) {
      throw new Error('Unknown component name: ' + name);
    }
    const instance = componentClassCreator();
    nameToInstance.set(name, instance);
    return instance;
  },

};

/**
 * Parameter decorator on a dependency parameter of a class fields that specifies a custom provider of the dependency.
 * @param {any} _value
 * @param {object} root0
 * @param {string} root0.kind
 * @param {string} root0.name
 * @returns {void | function(): *}
 */
export function inject(_value, {kind, name}) {
  if (kind === 'field') {
    return () => {
      return registry.getInstance(name);
    };
  }
}
/**
 * Delete all creators and instances.
 */
export function clearRegistry() {
  nameToClassCreator.clear();
  nameToInstance.clear();
}


