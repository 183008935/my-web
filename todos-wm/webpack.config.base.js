const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const Webpack=require("webpack");


module.exports={
    entry:"./src/js/index.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"js/bundle.js"
    },
    resolve:{
        extensions:[".js",".jsx",".css"]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new Webpack.ProvidePlugin({
            React:"react",
            ReactDOM:"react-dom"
        })
        
    ],
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"
            },
            {
                test:/\.(gif|png|jpg)$/,
                loader:"url-loader",
                options:{
                    limit:10000,
                    name:'img/[name]_[hash].[ext]'
                }
            },
            {
                test:/\.jsx?$/,
                loader:"babel-loader",
                exclude:/node_modules/,
                query:{
                    compact:false,
                    presets:['react']
                }
            }
        ]
        }
    }