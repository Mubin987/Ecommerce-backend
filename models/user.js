const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
        userName:String,
        password:String,
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('User',userSchema);
//commonjs default export
module.exports = {User};