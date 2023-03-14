const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"suru8972@$",
    database:"cruduser"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get("/api/get",(req,res)=>{
    const sqlGet = "select * from user"
    db.query(sqlGet,(error,result)=>{
        res.send(result)
    })
})
app.post("/api/post",(req,res)=>{
    const {name,email,contact} = req.body
    const sqlinsert = "insert into user(name,email,contact) values (?,?,?); "
    db.query(sqlinsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})
app.delete("/api/remove/:id",(req,res)=>{
    const {id} = req.params
    const sqldelete = "delete from user where id = ?; "
    db.query(sqldelete,id,(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})
app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params
    const sqlGet = "select * from user where id = ?"
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})
app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params
    const {name,email,contact} = req.body
    const sqlupdate = "update  user set name = ?,email = ?,contact = ? where id = ?"
    db.query(sqlupdate,[name,email,contact,id],(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})
app.get("/",(req,res)=>{
    //const sql = "insert into user(name,email,contact) values ('user1','user1@gmail.com','78382727718');"
    //db.query(sql,(err,result)=>{
        //console.log("error",err)
        //console.log("result",result)
       // res.send("express")
    //})
    
    
})
app.listen(5000,()=>{
    console.log("hello ")
})