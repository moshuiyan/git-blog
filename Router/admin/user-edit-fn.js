const { validateUser } = require('../../Model/user')
const bcrypt = require('bcrypt')
const { User } = require('../../Model/user')
module.exports = async(req, res, next) => {

    try {
        // 这个方法返回一个promise对象
        await validateUser(req.body)
    } catch (e) {
        // 验证没有通过
        // e.message
        // 模板语法用反引号
        // redirect除了重定向也会send 加上return 就不一样了
        return res.redirect(`/admin/user-edit?message=${e.message}`)
    }
    // 判断邮箱是否注册
    // 这也是一个异步进程 
    let user = await User.findOne({ email: req.body.email })
    if (user != null) {
        // return res.send(user) 这会导致循环引用
        // console.log('邮箱已注册')
        // console.log(user)
        // next 只能接收一个参数 不能是对象
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已被占用' }))
    }
    // 加密处理 生成随机字符串
    const salt = await bcrypt.genSalt(10)
        // 这个返回值也是一个PromiSee对象
    const password = await bcrypt.hash(req.body.password, salt)
        //    替换密码
    req.body.password = password
        // 将用户信息添加到数据库
    await User.create(req.body)
        // res.send(req.body)  send写在最后 或者redirect
    res.redirect('/admin/user')

}