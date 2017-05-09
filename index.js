/**
 * 请求代理
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
// const opn = require('opn');

const app = express();
const path = require('path');
const { version, host, port, distPath, api } = require('./config');

const sitePath = path.resolve(distPath, version);


// 接口代理
for (let key in api.dev) {
  app.use(`/proxy/${key}`, proxy({
    target: api.dev[ key ],
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': ''
    }
  }));
}

// 静态文件
app.use(express.static(sitePath));

// 重定向到主页
app.get('*', (req, res) => {
  res.sendFile(`${sitePath}/index.html`);
});


// 监听port端口
app.listen(port, host, (err) => {
  if (err) throw err;
  console.log(`Listening at http://localhost:${port}`);
  // opn(`http://localhost:${port}`);
});