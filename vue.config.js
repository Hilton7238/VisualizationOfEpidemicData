module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    "^/api": ''
                }
            }
        }
    },
    publicPath: "./"
}