const jwt = require('jsonwebtoken')
const {admin} = require('../../models')

exports.authToken = async (req, res, next) => {
    try{
        const cookie = req.cookies
        const token = cookie && cookie.token
    
        if(!cookie || Object.keys(cookie).length == 0 ||cookie == null){
            return res.send({
                status:401,
                message: 'Unauthorize'
            })
        }

        const userVerifiedId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.send({
                    status: 403,
                    message: err.message
                })
            }
            console.log(user)
            return user.id
        })

        const userVerified = await admin.findOne({
            where: {
                id: userVerifiedId
            },
            attributes: {
                exclude: ['cretadAt', 'updatedAt']
            }
        })

        req.admin = userVerified.dataValues
        next()
    }catch (err){
        console.error(err)
        res.send({
            message:"Internal server error"
        })
    }
}