const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    title : { type : String, required : true },
    ratings : { type : String },
    price : { type : String },
    category : {type : String},
    imageUrl : {type : String},
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "SignUp",
        required : true
    }
},
{
    collection : "Card-Items"
})

module.exports = mongoose.model("Card-Items", cardSchema)