const config=require("./webpack.config.base");
const CleanWebpackPlugin=require("clean-webpack-plugin");
config.plugins.push(new CleanWebpackPlugin(['dist']));
module.exports=config;