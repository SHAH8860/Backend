const { query } = require('express')
const express = require('express')
const router = express.Router()
const connection=require('../connection')
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
module.exports=router