const { User } = require('../../Model/user')

module.exports = async(req, res) => {
    // 定义当前页
    let page = req.query.page || 1
        // 每页数据条数
    const pagesize = 10
        // 用户总数
    let count = User.countDocuments({})
        // 总页数
    let total = Math.ceil(count / pagesize)
        // 页码开始数据查询的位置
    let start = (page - 1) * pagesize

    let users = await User.find({}).limit(pagesize).skip(start)

    res.render('admin/user', { users: users, page: page, total: total })
        // res.send(users)
}