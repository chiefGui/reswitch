const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'reswitch'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'reswitch.js',
    library: 'reswitch',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /.\/node_modules/
      }
    ]
  }
}
