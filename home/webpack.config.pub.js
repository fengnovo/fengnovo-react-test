var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);		//相当于：cd /Users/tusm/Downloads/react-ele-webapp-master
var APP_PATH = path.resolve(ROOT_PATH, 'src');			//相当于：cd app
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');		//相当于：cd build

var cwd = process.cwd();
console.log('process.cwd()->'+cwd);	//	/Users/tusm/Downloads/react-ele-webapp-master		//cwd() 是当前执行node命令时候的文件夹地址 
console.log('__dirname->'+__dirname);	//	/Users/tusm/Downloads/react-ele-webapp-master		//__dirname是被执行的js 文件的地址

console.log('ROOT_PATH->'+ROOT_PATH);
console.log('APP_PATH->'+APP_PATH);
console.log('BUILD_PATH->'+BUILD_PATH);


module.exports = {
	entry:{
		app:path.resolve(APP_PATH,'app.js')
	},
	output:{
		path: BUILD_PATH,
        publicPath: '/',     //后面的就直接css/style.css  imgs/img.png
		filename:'js/[name]-[hash:8].js'
	},
	resolve:{
		extensions:['.js','.jsx']
	},
	module:{
		loaders: [
	      {
	        test: /\.jsx?$/,
	        loader: 'babel-loader',
	        include: APP_PATH,
	        query: {
	          //添加两个presents 使用这两种presets处理js或者jsx文件
	          presets: ['es2015', 'react']
	        }
	      },
          {
            test: /\.(css|scss)$/,
            include: APP_PATH,
            use: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader', 'sass-loader']
            })
          },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
				include: APP_PATH,
                query: {
                    limit: 8192,
                    name: './imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
				include: APP_PATH,
                query: {
                    name: '../fonts/[name]-[hash:8].[ext]',
                },
            }
	    ]
	},
    plugins: [
    	new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
     	new HtmlwebpackPlugin({
	      template: path.resolve(ROOT_PATH, 'publish.html'),
	      filename: 'index.html',
	      chunks: ['app', 'vendors'],
	      inject: 'body'
	    }),
	    new ExtractTextPlugin('css/[name]-[hash:8].css')
	  ]
}