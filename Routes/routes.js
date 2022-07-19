
var express = require('express')
var router = express.Router()
var connection=require('../connection')
router.post('/signup',(req,res)=>{
    let user=req.body
    console.log(req.body)
     query="select email,password,role,status from person where email=?"
    connection.query(query,[user.email],(err,result)=>{
        if(!err){
            console.log("result=",result)
            if(result<=0){
                 query='insert into person (name,contactnumber,email,password,status,role) values(?,?,?,?,"false","user")'
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
module.exports=router