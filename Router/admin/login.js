const bcrypt = require('bcrypt')
const { User } = require('../../Model/user')
module.exports = async(req, res) => {
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0)

    // res.status(400).send("邮箱地址或密码错误")
        return res.status(400).render('admin/error', { msg: '邮件地址或密码' })
        // 如果 查询到了用户信息user变量为对象，否则为空
    let user = await User.findOne({ email: email })
    if (user) {
        // 客户端的账户信息和服务器端匹配
        let isvalid = await bcrypt.compare(password, user.password)
        if (isvalid) {
            req.session.username = user.username
            req.app.locals.userInfo = user
            res.redirect('/admin/user')
                // res.send('登录成功')
        }
    } else {
        res.status(400).render('admin/error', { msg: '用户邮箱不存在或错误' })
    }

}