
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    //app.use('/auth/google', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: false }));
    app.use('/authjwt/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    app.use('/admin/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    //app.use('/auth/local/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    //app.use('/auth/api/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
};
