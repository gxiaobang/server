/**
 * 前端服务器
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
// const opn = require('opn');

const app = express();
const path = require('path');
const { port, distPath, api } = require('./config');

const argv = require('yargs')
  .option('refer', {
    default: 'dev'
  })
  .argv;

// 接口代理
for (let key in api[argv.refer]) {
  app.use('/' + key, proxy({
    target: api[argv.refer][ key ],
    changeOrigin: true
  }));
}

// 静态文件
app.use(express.static(distPath));

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())


// 监听port端口
app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Listening at http://localhost:${port}`);
  // opn(`http://localhost:${port}`);
});