const User = require("../models/User")
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const AuthController = {
    register: async(req, res) => {
        const {fullName, email, password} = req.body

        if(!fullName || !email || !password) 
            return res.status(400).json({success: false, message: 'Vui lòng nhập đủ thông tin'})

        try {
            const user = await User.findOne({email})

            if(user)
                return res.status(400).json({success: false, message: 'Email đã tồn tại'})

            //hash password
            const hashPass = await argon2.hash(password)
            const newUser = new User({fullName, email, password: hashPass})
            await newUser.save()

            //json web token
            const accessToken = jwt.sign({
                id: newUser._id,
            }, process.env.ACCESS_TOKEN_SECRET)

            return res.status(200).json({success: true, newUser, accessToken})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }

    },
    login: async(req,res) => {
        // const {email, password} = req.body
        
        // if(!email || !password)
        //     return res.status(400).json({success: false, message: 'Vui lòng nhập đủ thông tin'})

        // try {
        //     const user = await User.findOne({email})
        //     if(!user)
        //         return res.status(400).json({success: false, message: 'Tài khoản/ Mật khẩu không chính xác'})
            
        //     const isPass = await argon2.verify(user.password, password)
        //     if(!isPass)
        //         return res.status(400).json({success: false, message: 'Tài khoản/ Mật khẩu không chính xác'})

            //json web token
            const accessToken = jwt.sign({
                id: req.user._id,
            }, process.env.ACCESS_TOKEN_SECRET)
            
        //     res.status(200).json({success: true, user, accessToken})
        // } catch (error) {
        //     console.log(error);
        //     res.status(500).json({success: false, message: 'Lỗi server'})
        // }
        return res.status(200).json({success: true, user: req.user, accessToken})
    }
}

module.exports = AuthController