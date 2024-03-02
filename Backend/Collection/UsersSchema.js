const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    FirstName : { type : String },
    LastName : { type : String },
    Email : { type : String },
    Password : {type : String},
    role : {
        type : String,
        default : "user"
    },
    savedItems : [{type : mongoose.Schema.Types.ObjectId, ref : "Card-Items"}],
    cartItems : [{type : mongoose.Schema.Types.ObjectId, ref : "Card-Items"}]
},
{
    collection : "SignUp"
})

module.exports = mongoose.model("SignUp", UsersSchema)