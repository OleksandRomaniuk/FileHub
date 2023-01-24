module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'google',
    'plugin:jest/recommended',
  ],
  'parser': 'babel-eslint',
  // 'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': '13',
    'sourceType': 'module',
    'project': ["./tsconfig.json"],
  },
  'plugins': [
    'jest',
    'jsdoc',
    '@typescript-eslint'
  ],
  'overrides': [
    {
      'files': ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      'extends': [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      'parserOptions': {
        'project': './tsconfig.json', // Specify it only for TypeScript files
      },
    },
  ],
  'rules': {
    'valid-jsdoc': ['error', {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {return: 'returns'},
    }],
    "template-curly-spacing" : "off",
    "indent": ["error", 2, {
      "ignoredNodes": ["TemplateLiteral"]
    }],
    'max-len': ['error', {code: 120}],
    'no-console': 'error',
    'no-debugger': 'error',
    'jsdoc/check-access': 'error',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-property-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/check-values': 'error',
    'jsdoc/empty-tags': 'error',
    'jsdoc/implements-on-classes': 'error',
    'jsdoc/multiline-blocks': 'error',
    'jsdoc/no-multi-asterisks': 'error',
    'jsdoc/no-undefined-types': 'error',
    'jsdoc/require-asterisk-prefix': 'error',
    'jsdoc/require-description': [
      'error',
      {
        exemptedBy: ['inheritDoc', 'private'],
        checkConstructors: false,
        checkGetters: false,
        checkSetters: false,
      },
    ],
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-jsdoc': ['error', {
      exemptEmptyConstructors: true,
      checkGetters: false,
    }],
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-property': 'error',
    'jsdoc/require-property-name': 'error',
    'jsdoc/require-property-type': 'error',
    'jsdoc/require-returns': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/require-throws': 'error',
    'jsdoc/require-yields': 'error',
    'jsdoc/require-yields-check': 'error',
    'jsdoc/sort-tags': 'error',
    'jsdoc/tag-lines': 'error',
    'jsdoc/valid-types': 'error',
  },
};
