module.exports = () => ({
  files: [
    'pages/**.js',
    '!pages/**.test.js',
    'components/**.js',
    '!components/**.test.js',

  ],

  tests: [
    'pages/**.test.js',
    'components/**.test.js',
  ],

  env: {
    type: 'node',
    runner: 'node',
  },

  testFramework: 'jest',
})
