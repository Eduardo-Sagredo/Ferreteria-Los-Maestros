module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: [
      'jasmine'
    ],

    files: [
      {
        pattern: 'src/**/*.js',
        included: false,
        served: true
      },
      {
        pattern: 'tests/**/*.spec.js',
        included: true,
        served: true
      }
    ],

    reporters: [
      'progress'
    ],

    browsers: [
      'ChromeHeadless'
    ],

    singleRun: true,

    client: {
      clearContext: false
    }
  })
}