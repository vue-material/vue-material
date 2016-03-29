var staticServer = require('koa-static')
var path = require('path')
var koa = require('koa')
var app = koa()

app.use(staticServer(path.join(__dirname, '../temp')))
app.listen(8888)
