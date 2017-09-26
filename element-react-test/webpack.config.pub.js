var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);		
var APP_PATH = path.resolve(ROOT_PATH, 'src');			
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');		


module.exports = {
	entry:{
		// vendor: ['react','react-dom','react-router','redux','react-redux'],
		app: [path.resolve(APP_PATH,'app.js')],
	},
	output:{
		path: BUILD_PATH,
        publicPath: './',     //后面的就直接css/style.css  imgs/img.png
		filename:'js/[name]-[hash:8].js',
        // chunkFilename: 'js/[id].js'
	},
	resolve:{
		extensions:['.js','.jsx']
	},
	module:{
		loaders: [
          	{
				test: /\.(css|scss)$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}, {
				test: /\.(js|jsx)?$/,
				loaders: ['babel-loader']
			}, {
				test: /\.(jpg|jpeg|png|gif)$/,
				loaders: ['url-loader']
			}, {
				test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loaders: ['file-loader']
			}
	    ]
	},
    plugins: [
    	new webpack.DefinePlugin({
          	"process.env": {
		        NODE_ENV: JSON.stringify("production")
		    }
      	}),
     	//这个使用uglifyJs压缩你的js代码
	    new webpack.optimize.UglifyJsPlugin({
	    	minimize: true,
	    	output: {
		        comments: false,  // remove all comments
		    },
            compress: {
                warnings: false
            }
	    }),
	    new HtmlwebpackPlugin({
	      title: 'react-ele-webapp',
	      template: path.resolve(ROOT_PATH, 'publish.html'),
	      filename: 'index.html',
	      favicon:'./favicon.ico',
	      // chunks: ['app', 'vendors'],
	      minify: {
               caseSensitive: false, 			//是否大小写敏感
			   collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
			   collapseWhitespace: true 		//是否去除空格
          },
	      inject: 'body'
	    }),
        new ExtractTextPlugin('css/[name]-[hash:8].css')
	  ]
}