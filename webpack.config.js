const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin'); // generates index.html from my template
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // put css in separate file, nto directly within javascript file

module.exports = {
  mode: prod ? 'production' : 'development', // says if build is for development or pdocution. In production, webpack minifies the bundle.
  entry: './src/index.tsx', // how to start the application after the client first loads the app: what module to execute first.
  output: { // put compiled files in this directory
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      { // load ts files with a ts-loader
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      { // load css files with a css-loader
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map', // make source maps in development, not in production. (because they'd add extra size to the production bundle, and they're useful in development)
  plugins: [
    new HtmlWebpackPlugin({ //automatically inject js and css into html file (with script and link tags), even when asset names change.
      template: 'index.html', // use this template to generate the html file.
    }),
    new MiniCssExtractPlugin(), // this plugin puts css from js code into separate css files. because performance is better when they are separate, and browser caching off css files is better. instantiated without any special options
  ],
};