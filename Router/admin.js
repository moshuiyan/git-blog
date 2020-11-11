const express = require('express')
const admin = express.Router()
    // 导入用户集合构造 函数

// 渲染登录页面
admin.get('/login', require('./admin/loginpage'))
    // 实现登录功能
admin.post('/login', require('./admin/login'))

// 创建用户列表路由
admin.get('/user', require('./admin/userpage'))
    // 退出功能
admin.get('/logout', require('./admin/logout'))
    // 创建新增用户页面路由
admin.get('/user-edit', require('./admin/user-edit'))
    // 注册功能
admin.post('/user-edit', require('./admin/user-edit-fn'))
admin.post('/user-modify', require('./admin/user -modify'))

module.exports = admin;