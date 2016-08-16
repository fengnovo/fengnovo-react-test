module.exports.getConfig = function(isPub) {
  var isDev = !isPub;

  var config = {
    entry: './src/js/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    }
  };

  isDev ? config.devtool = 'eval-source-map' : config.devtool = 'eval';

  return config;
}