require('dotenv').config()
const passport = require('passport')
const argon2 = require('argon2')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}, async (payload, done) => {
    try {
       const user = await User.findById(payload.id)

       if(!user) return done(null, false)
       console.log(payload);
    } catch (error) {
        done(error, false)
    }
}))

//Passport local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({email})

        if(!user) return done(null, false)

        const isCorrectPass = await argon2.verify(user.password, password)
        
        if(!isCorrectPass) return done(null, false)

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))