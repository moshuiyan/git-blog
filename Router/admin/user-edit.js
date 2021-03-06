// 引入joi
const { User } = require('../../Model/user')
const joi = require('joi')
module.exports = async(req, res) => {
    // 获取地址栏中的id 参数
    const { message, id } = req.query
    if (id) {
        // 修改操作
        let user = await User.findOne({ _id: id })


        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'

        })
    }

}