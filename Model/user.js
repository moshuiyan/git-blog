// 创建用户集合
// 引入mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')
    // 创建用户集合规则

const userSchea = new mongoose.Schema({
        username: {
            type: String,
            //    是否必填
            required: true,
            minlength: 2,
            maxlength: 20
        },
        email: {
            type: String,
            // 保证邮箱地址在插入数据库时不重复
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true

        },
        // admin为超级管理员，normal为普通用户
        role: {
            type: String,
            required: true

        },
        // 1是禁用 0启用
        state: {
            type: Number,
            // 默认值
            default: 0
        }
    })
    // 创建集合
const User = mongoose.model('User', userSchea)
async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456', salt)
    const user = await User.create({
        username: 'itheima',
        password: pass,
        email: 'itheima2@cast.cn',
        role: 'admin',
        state: 0

    })
}
// 验证用户信息
const validateUser = user => {

        // 定义验证规则
        const schema = {
            username: Joi.string().min(2).max(5).required().error(new Error('用户名不合法')),
            email: Joi.string().email().required().error(new Error('邮箱不合法')),
            password: Joi.string().min(6).required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不合法')),
            role: Joi.string().valid('normal', 'admin').error(new Error('角色不合法')),
            state: Joi.number().valid(0, 1).error(new Error('状态值非法'))
        }
        return Joi.validate(user, schema)
    }
    // createUser()
    // 将用户成员作为模块成员导出
module.exports = {
    User,
    validateUser
}