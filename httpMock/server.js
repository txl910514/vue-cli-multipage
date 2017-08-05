/**
 * Created by txl-pc on 2017/8/4.
 */
var path = require('path');
var fs = require('fs')
var app = require('express')();
var port = process.argv.slice(2)[0] || 8080;
var mock = require("mockjs");

var getIP = function() {
  var os = require('os');
  var IPv4 = '127.0.0.1';
  var interfaces = os.networkInterfaces();
  for (var key in interfaces) {
    interfaces[key].some(function(details){
      if (details.family == 'IPv4' && key == 'en33') {
        IPv4 = details.address;
        return true;
      }
    });
  }
  return IPv4;
};

var HOST =  getIP();
var uri = 'http://' + HOST + ':' + port;
var server = app.listen(port, HOST, function() {
  console.info(uri);
});

const prefix = '/mock';

var api = {};
var apiPath = path.join(__dirname, './api.json');

function getApis() {
  fs.readFile(apiPath, 'utf-8', function(err, content) {
    api = JSON.parse(content);
  });
}
//监听api.json变化
fs.watchFile(apiPath, function(curr) {
  console.log('API is updated.', curr.mtime);
  getApis();
});
getApis();

app.use(function (req, res) {
  var data = undefined;
  var delay = 0;
  for(var group in api) {
    if(api[group].find(function(reqData) {
        if(req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
          return false;
        }
        var apiRes = reqData.res;
        data = reqData.mock ? mock.mock(apiRes) : apiRes;
        delay = reqData.delay || 0;
        return true;
      }) !== undefined) {
      break;
    }
  }
  data !== undefined ? setTimeout(() => res.json(data), delay) : res.sendStatus(404);
})