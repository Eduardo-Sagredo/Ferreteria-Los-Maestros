process.env.EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

module.exports = function(config) {
  config.set({
    // Usamos Jasmine como framework
    frameworks: ['jasmine'],

    // Archivos que Karma va a buscar para ejecutar las pruebas
    files: [
      'src/**/*.spec.jsx'
    ],

    // Preprocesadores: Le decimos a Karma que pase los archivos JSX por Webpack antes de probarlos
    preprocessors: {
      'src/**/*.spec.jsx': ['webpack']
    },

    // Configuración de Webpack para traducir React con Babel
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
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          },
          {
            // Ignorar importaciones de CSS/imágenes en los tests
            test: /\.(css|png|jpg|jpeg|gif|svg)$/,
            use: 'null-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // No mostrar toda la consola de Webpack, solo errores
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Usamos el navegador Edge moderno que acabamos de configurar
    browsers: ['Edge'],
    
    // Ejecuta las pruebas una vez y se cierra
    singleRun: true
  });
};