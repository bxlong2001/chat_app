const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 25
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dxcaak8n5/image/upload/v1678091118/default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)