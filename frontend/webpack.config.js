const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // entry: './index.jsx',
  // watch: true,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        // ,
        // options: {
        //     presets: [
        //         '@babel/preset-env',
        //         '@babel/react', {
        //             'plugins': ['@babel/plugin-proposal-class-properties']
        //         }]
        // }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // plugins: [
  //   new BundleAnalyzerPlugin(),
  // ],
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
