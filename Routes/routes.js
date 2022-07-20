
const { query } = require('express')
const express =require('express')
var router = express.Router()
var nodemailer=require('nodemailer')
var connection=require('../connection')
router.post('/signup',(req,res)=>{
    let user=req.body
    console.log(req.body)
    let query="select email,password,role,status from person where email=?"
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            if(result<=0){
                let query='insert into person (name,contactnumber,email,password,status,role) values(?,?,?,?,"false","user")'
                connection.query(query,[user.name,user.contactnumber,user.email,user.password],(err,result)=>{
                    if(!err){
                        return res.status(200).json({message:'Succesful register'})
                    }
                    else{
                        return res.status(500).json(err)
                    }
                })
            }
            else{
                return res.status(400).json({message:'Email already exist'})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.post('/login',(req,res)=>{
    let user=req.body
    query="select email,password,status,role from person where email=?"
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            if(result.lenght<=0 ||result[0].password!=user.password){
                return res.status(401).json({message:'Incorrect password'})
            }
            else if(result[0].status=="false"){
                return res.status(401).json({message:"wait for admin approval"})

            }
            else if(result[0].password==user.password){
                return res.status(200).json({message:"succesfull"})
            }
            else{
                return res.status(500).json({message:"Something went wrong"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })
})
// var transport=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'kumarnirajshah2000@gmail.com',
//         pass: 'NIRAJ8860929739'
//     }
// })
// var option={
//     from:"kumarnirajshah2000@gmail.com",
//     to:"",
//     subject:"Reset password",
//     text:"hello"
// }
// transport.sendMail(option,(err,info)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(info.response)
//     }
// })


router.get('/get',(req,res)=>{
    var query="select id,name,contactnumber,email,password,status from person where role='user'";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result)

        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.patch('/update',(req,res)=>{
    var user=req.body;
   var query="update person set status=? where id=?"
    connection.query(query,[user.status,user.id],(err,result)=>{
        if(!err){
            if(result.affectedRow==0){
                return res.status(404).json({message:"User not exist"})
            }
            else{
                return res.status(200).json({message:"User updated"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })
})

module.exports=router