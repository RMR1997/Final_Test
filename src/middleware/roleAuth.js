exports.roleAuth = (req,res,next) => {
    const roleAllowed = ["admin"]
    let allowedBool = false

    roleAllowed.map((roleAllowed) => {
        if (req.admin.role == roleAllowed) {
                allowedBool = true
        }
    })

    if (allowedBool) {
        return next()
    } else {
        return res.send ({
            status : 403,
            message: 'Gabisa Akses mas harus jad admin dulu'
        })
        
    }
}