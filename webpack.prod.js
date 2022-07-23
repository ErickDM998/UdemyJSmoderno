const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports ={
    mode: "production",

    output:{
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            { 
                test: /\.html$/ ,
                loader: 'html-loader' ,
                options: {
                    sources: false
                } 
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,  // esto excluye que sea el unico momento en ql que revisa los CSS disponibles ya que abajo hay otro
                use: ['style-loader','css-loader']
            },
            {
                test: /styles.css$/,
                use:[MiniCssExtract.loader, 'css-loader']

            },
            {

                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',    //cambia el contenido del tag title
            //filename: 'index.html'  //Cambia el nombre del archivo que se va a crear a la hora de ejecutar el npm run build en la terminal
            template: './src/index.html' //el archivo del cual queremos que se base sto, seria el index


        }) , // movio el index.html a la carpeta dist

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false

        }),

        new CopyPlugin({
            patterns: [ 
                {from: 'src/assets',to: 'assets/'}
            ]
        })

    ],
    
}