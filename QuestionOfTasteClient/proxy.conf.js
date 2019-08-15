const PROXY_CONFIG = {
  "/api": {
    "target": "http://localhost:1219",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    },
    "onProxyRes": function (proxyRes, req, res) {
      proxyRes.headers['Expires'] = '-1';
      proxyRes.headers['Cache-Control'] = 'no-cache, must-revalidate, private';
    },
  }
};

module.exports = PROXY_CONFIG;
