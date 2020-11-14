const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = 3002;

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

function webpackConfig(env, argv) {
  return {
    entry: './src/index.js',
    output: {
      path: distPath,
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: srcPath,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.json$/,
          type: 'javascript/auto',
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      argv.mode === 'production' && new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({template: './src/index.html', minify: false}),
    ].filter(Boolean),
    devServer: {
      port: port,
      contentBase: path.join(__dirname, 'dist')
    }
  };
}

module.exports = webpackConfig;
