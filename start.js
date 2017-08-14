/**
 * 静态服务器
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const opn = require('opn');

const app = express();
const path = require('path');

const argv = require('yargs')
  .option('proxy', {
    default: 'dev'
  })
  .option('port', {
    alias: 'p',
    default: 8080
  })
  .option('open', {
    alias: 'o',
    default: false
  })
  .argv;


// 接口代理
const proxyTable = require('./config/proxy.conf');
for (let key in proxyTable[argv.proxy]) {
  app.use('/' + key, proxy(proxyTable[argv.proxy][ key ]));
}

// 静态文件
app.use(express.static('./dist'));

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback'))


// 监听port端口
app.listen(argv.port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`> Listening at http://localhost:${argv.port}`);

  if (argv.open) {
    opn(`http://localhost:${argv.port}`);
  }
});
