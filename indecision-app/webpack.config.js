const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: "./src/app.js",
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.s?css$/, //configuring <style> tag in html using webpack
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: path.join(__dirname, 'public'),
    open: 'chrome', // Automatically open Chrome
    hot: true, // Enable Hot Module Replacement
    port: 8080, // Customize the port if needed
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin()] : []) // Only include BundleAnalyzerPlugin in development
  ]
}