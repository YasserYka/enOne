module.exports = {
  entry:  '.',
  output: {
    path: 'build',
      filename: 'bundle.js',
    },
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['style', 'css'],
      }
    ],
  }
};
