//entry point (filename + path) ==> next the module dependencies
//once - minification, transpilation, reference resolution, bundling is done
//output path and name of file <bundle.js>
//all modules that webpack is dependent on is termed as loaders needs

let path = require("path"), // path module of node framework
HtmlWebpackPlugin = require("html-webpack-plugin"), //to load the index html file on request

config = {
  cache: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9090,
    historyApiFallback : true, //localhost:9090
    liveReload: true,
   },
// Rules of how webpack will take our files, complie & bundle them for the browser 
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
              loader: 'babel-loader'
            }
        },
        {
            test: /\.css$/,
            exclude: /nodeModules/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            exclude: /nodeModules/,
            type: 'asset/resource',
        }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'material-ui': path.resolve('./node_modules/@material-ui'),
    }
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]  //localhost:9090 - loads this html
}

module.exports = config;