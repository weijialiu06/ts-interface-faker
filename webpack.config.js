const path = require('path');
const nodeExternals = require('webpack-node-externals');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/InterfaceFaker.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'interfaceFaker.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        use: [{ loader: 'babel-loader' }],
        exclude: /node_modules/,
      },
    ],
  },
  //plugins: [new CleanWebpackPlugin(['dist'])],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: [nodeExternals()],
};
