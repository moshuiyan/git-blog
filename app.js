// 引入express
const express = require('express')
    // 处理路径
const path = require('path')
    // 建立服务器
const app = express()
    // 数据库连接   不需要返回值所以不用接收
require('./Model/connect')
    // 告诉express 模板所在位置 第一个参数是固定的
app.set('views', path.join(__dirname, 'View'))
    // 告诉express模板默认后缀
app.set('view engine', 'art')
    // 渲染后缀art的模板时使用的模板引擎
app.engine('art', require('express-art-template'))
    // 开放静态资源  当前文件的绝对路径path.join(__dirname, 'public')
app.use(express.static(path.join(__dirname, 'public')))
    // 引入路由模块
const home = require('./Router/home')
const admin = require('./Router/admin')
    // 匹配路由请求路径
app.use('/home', home)
app.use('/admin', admin)

app.listen(80)
console.log('80端口启动')