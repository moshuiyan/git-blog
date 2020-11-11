// 引入express
const express = require('express')
    // 处理路径
const path = require('path')
    // 引入bodyPaser
const bodyParser = require('body-parser')
    // 引入session 是一个方法
const session = require('express-session')
    // 建立服务器
const app = express()
    // 数据库连接   不需要返回值所以不用接收
require('./Model/connect')
    // require('./Model/user')
    // 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
    // 配置sess
app.use(session({ secret: 'secret key' }))
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
const { nextTick } = require('process')
    // 拦截请求判断登录状态
app.use('/admin', require('./middleware/loginGuard'))
    // 匹配路由请求路径
app.use('/home', home)
app.use('/admin', admin)
    // 错误处理
app.use((err, req, res, next) => {
    const result = JSON.parse(err)
    let params = []
    for (k in result) {
        if (k != 'path') {
            params.push(k + '=' + result[k])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

app.listen(80)
console.log('80端口启动')