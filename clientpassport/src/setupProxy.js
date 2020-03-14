
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/authpassport/google', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: false }));
    app.use('/authpassport/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    //app.use('/admin/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
    app.use('/admin/*', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
};

