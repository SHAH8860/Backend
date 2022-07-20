const { query } = require('express')
const express =require('express')
var router = express.Router()
var connection=require('../connection')
router.post('/add',(req,res)=>{
    let catogery=req.body
    var query="insert into category (name)  values(?)"
    connection.query(query,[catogery.name],(err,result)=>{
        if(!err){
            return res.status(200).json({message:"Item add Successfully"})
        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.get('/get',(req,res)=>{
    var  query="select id,name from category"
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
    let cat=req.body
    
    var query="update category set name=? where id=?"
    connection.query(query,[cat.name,cat.id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:"Id not found"})
            }
            else{
            return res.status(200).json({message:"Success"})
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
})
module.exports=router
