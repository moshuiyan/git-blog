const guard = (req, res, next) => {
    if (!req.session.username && req.url != '/login') {
        res.redirect('/admin/login')
    } else {
        next()
    }
}
module.exports = guard