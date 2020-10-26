const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports={
	mode: 'production',
	entry: './src/index.js',
	output:{
		path: path.resolve(__dirname,'dist'),
		filename: 'client.js',
		publicPath: '/',
	},
	
	
	module: {
		rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    targets: {
                      browsers: "> 3%" // можно и указать конкретные браузеры
                    }
                  }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader'
            ]
          },
          {
            test: /\.scss$/,
            use: [
               'style-loader',
                'css-loader',
                'sass-loader'
            ]
          },
         
       ]
	},
	devServer: {
    contentBase: './static',
    compress: true,
    port: 9999,
    historyApiFallback: true,

   },
   optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
   },
   plugins: [
       new HtmlWebpackPlugin({template: './src/index.html'}),
       new MiniCssExtractPlugin({
        filename: 'client.css'
      })
   ],
   resolve: {
    modules: [
        path.join(__dirname, 'src', 'main', 'resources', 'static', 'js'),
        path.join(__dirname, 'node_modules'),
    ],
  }
	
}
