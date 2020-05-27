const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:String,
    username: String,
    email: String,
    password: String,
    role: { type: mongoose.Schema.Types.ObjectId,
            ref: "Role"}
    
})
const User = mongoose.model("user",schema);

module.exports = User;