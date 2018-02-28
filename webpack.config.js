const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//生产模式将css分离的
var webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const extractLess = new ExtractTextPlugin({
    filename: '../style/[name].css',//输出目录
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {//入口
      index:'./src/script/index.js',
      Commons:['react','react-dom']
  },
  output: {//出口
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js'
  },
  module: { //loader 
    rules: [{ 
        test: /\.js$/,
        include:[
              path.resolve(__dirname,'src/script')
            ], 
        use: 'babel-loader',
    },
    {
        test: /\.less$/,
        use: extractLess.extract({
            use: [{
                loader: "css-loader", // translates CSS into CommonJS
                options:{
                    minimize: true //css压缩
                }
            }, {
                loader: "less-loader" // compiles Less to CSS
            }],
            // use style-loader in development
            fallback: "style-loader"
      })
    }]
  },
   plugins: [  //插件
    extractLess,
    new webpack.optimize.UglifyJsPlugin({ //webpack内置js插件 有压缩功能
            compress: {
              warnings: false
            }
          }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ["Commons","runtime"],
      })
],
//    externals:{ //外部扩展
//         jquery: 'jQuery',
//         react:"React",
//         'react-dom':'ReactDOM'
//     }
};