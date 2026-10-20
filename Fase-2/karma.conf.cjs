module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {
        pattern: 'src/**/*.spec.js',
        included: true,
        served: true
      },
      {
        pattern: 'src/**/*.spec.jsx',
        included: true,
        served: true
      }
    ],

    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',

      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic'
                    }
                  ]
                ]
              }
            }
          },
          {
            test: /\.(css|png|jpg|jpeg|gif|svg)$/,
            use: 'null-loader'
          }
        ]
      },

      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress'],

    browsers: ['ChromeHeadless'],

    singleRun: true,

    client: {
      clearContext: false
    }
  })
}