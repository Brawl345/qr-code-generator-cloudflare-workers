module.exports = {
  extends: ['airbnb-base', 'prettier'],
  reportUnusedDisableDirectives: true,
  env: {
    serviceworker: true,
    worker: true,
  },
  rules: {
    'no-restricted-globals': 'off',
  },
};
