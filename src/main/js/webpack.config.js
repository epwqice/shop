var webpack = require('webpack');
var path = require('path');
module.exports = (env) => {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  return {
    devtool: isProd ? 'eval' : 'source-map',
    entry: {
      item: './src/service/item.js',
      portal: './src/service/portal.js',
      vendor: ['react'],
    },
    output: {
      path: path.join(__dirname, '../resources/static/js'),
      filename: '[name].js'
    },
    module: {
      rules:[
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
        { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
        {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }]
    }
  };

}