const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const UserRegister = require('./Collection/UsersSchema')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const itemRouter = require('./Routes/card')


const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    methods : ["GET", "POST", "PUT" , "DELETE"],
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/card', itemRouter)

mongoose.set('strictQuery', true)
const uri = "mongodb+srv://test1:test1@cluster0.ebs6shf.mongodb.net/"

mongoose.connect(uri);

const verifyUser = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.json("the token is misiing")
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("the token is wrong")
            } else {
                req.Email = decoded.Email;
                req.FirstName = decoded.FirstName;
                req.id = decoded.id;
                next()
            }
        })
    }
}



app.get('/', verifyUser,(req,res) => {
    return res.json({Email : req.Email, FirstName : req.FirstName, id : req.id})
})

const db = mongoose.connection;
db.on("open", () => {
    console.log("Database connected")
})
db.on("error", (err) => {
    console.log("error occured", err)
})
app.get("/" , (req,res) => {
    res.write("Hello from Server");
    res.end()
})

// app.post("/SignUp", (req,res) => {
//     const {FirstName, LastName, Email, Password} = req.body;
//     UserRegister.findOne({Email : Email})
//     .then(user => {
//         if(user) {
//             res.json("Already have an account")
//         } else {
//             UserRegister.create({FirstName : FirstName, LastName : LastName, Email : Email, Password : Password})
//             .then(result => res.json("Account created"))
//             .catch(err => res.json("Error", err))
//         }
//     }).catch(err => res.json(err))
// })

app.post('/SignUp' , (req,res) => {
    const {FirstName, LastName, Email, Password} = req.body;
    bcrypt.hash(Password, 10)
    .then(hash => {
        UserRegister.create({FirstName , LastName , Email, Password : hash})
        .then(users => res.json({status : "ok"}))
        .catch(err => res.json(err))
    }).catch(err => console.log(err))
    
})

app.post("/Login", (req,res)=> {
    const {Email, Password} = req.body;
    UserRegister.findOne({Email : Email})
    .then(user => {
        if(user) {
            bcrypt.compare(Password, user.Password,(err, response) => {
                if(response) {
                    const token = jwt.sign({Email : user.Email, FirstName : user.FirstName, id: user.
                        _id}, "jwt-secret-key", {expiresIn : '1d'} )
                    res.cookie("token", token)
                    return res.json({status : "Success" ,  role : user.role, id: user.
                    _id})
                } else{
                    res.json("the password is incorrect")
                }
                
            })
        } else {
            res.json("No record found")
        }
    }).catch(err => console.log(err))
})

app.get('/Logout', (req,res) => {
    res.clearCookie('token')
    return res.json({message : "Success"})
})

const port = 8090
app.listen(port, () => {
    console.log("Server is running", port)
})