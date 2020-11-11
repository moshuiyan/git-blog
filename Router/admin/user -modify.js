const { User } = require('../../Model/user')
const bcrypt = require('bcrypt')
module.exports = async(req, res, next) => {
    const { username, password, state, role } = req.body
        // req用于获取get传递地址栏参数 body用于post传递
    const id = req.query.id
        // 同样式异步
    const user = await User.findOne({ _id: id })
        // 前者为明文密码 后者为加密密码 compare 也是异步

    const isvalid = await bcrypt.compare(password, user.password)
        // res.send(user)
    if (isvalid) {
        await User.updateOne({ _id: id }, {
            username: username,
            password: password,
            role: role,
            state: state
        })
        res.redirect('/admin/user')
            // res.send('密码正确')
    } else {
        let obj = {
            path: '/admin/user-edit',
            message: '密码错误，不能修改',
            id: id
        }
        next(JSON.stringify(obj))
    }
}