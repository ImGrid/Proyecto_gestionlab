const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        user:{
            type:String,
            unique: true,
            required : true
        },
        pasword:{
            type:String,
            unique: true,
            required : true
        }
    }
)

module.exports = mongoose.model('user',UserSchema)