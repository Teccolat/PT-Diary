
const mongoose =require('mongoose');

let userSchema =new mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    roleType: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }

    },{
        timestamps: true,
    });

const User =mongoose.model('User', userSchema);

module.exports = User;