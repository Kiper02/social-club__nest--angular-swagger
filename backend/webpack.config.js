const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join, resolve } = require('path');

module.exports = {
  entry: './src/main.ts', // Точка входа в приложение
  target: 'node', // Для Node.js
  mode: 'development', // Или 'production'
  resolve: {
    extensions: ['.ts', '.js'], // Поддерживаемые расширения
    alias: {
      src: resolve(__dirname, 'src'), // Алиас для пути 'src'
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: join(__dirname, 'src/static'), to: join(__dirname, 'dist/static') },
      ],
    }),
  ],
  output: {
    filename: 'main.js',
    path: join(__dirname, 'dist'),
  },
};
