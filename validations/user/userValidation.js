const userModelSchema = require('../../model/userModelSchema')
const schema = require("../user/user_Schema")

module.exports = {
    registerUserValidation: async(req,res, next)=>{
        const value = await schema.registerUser.validate(req.body,{abortEarly: false})
        if(value.error){
            res.json({
                success:0,
                message:value.error.details[0].message
            })
        }else{
            next()
        }
    },


loginUserValidation: async (req, res, next) => {
    const value = await schema.loginUser.validate(req.body, { abortEarly: false })
    if (value.error) {
        res.json({
            succes: 0,
            message: value.error.details[0].message
        })
    } else {
        next()
    }
},
}

