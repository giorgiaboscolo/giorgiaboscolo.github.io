const webpack = require('webpack');
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
module.exports = {
    publicPath: import.meta.env.NODE_ENV === 'production'
        ? '/productiontestpath/'
        : '/',
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'import.meta.env': {
                    PACKAGE_VERSION: '"' + version + '"'
                }
            })
        ]
    },
}


// devServer: {
//     proxy: 'http://localhost:3000'
// }
// devServer: {
//     proxy: {
//       'localhost:3000': {
//         target: 'http://localhost:3000',
//         ws: true,
//         changeOrigin: true
//       }
//     }
// }
  
  
  