const { query } = require('express')
const express =require('express')
var router = express.Router()
var connection=require('../connection')
router.post('/add',(req,res)=>{
    let prod=req.body
    var query="insert into product(name,catogeryID,description,price,status) values(?,?,?,?,'true')"
    connection.query(query,[prod.name,prod.catogeryID,prod.description,prod.price],(err,result)=>{
        if(!err){
            return res.status(200).json({message:'Product added successfully'})

        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.get('/get',(req,res)=>{
    var query="select p.id,p.name,p.description,p.price,p.status,c.id as catogeryID,c.name as catogeryName from product as p  INNER JOIN category as c where p.catogeryID=c.id";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.get('/getbycatogery/:id',(req,res)=>{
    var id=req.params.id;
    var query="select id,name from product where catogeryID=?"
    connection.query(query,[id],(err,result)=>{
        if(!err){
            return res.status(200).json(result)

        }
        else{
            return res.status(500).json(err)
        }
    })

})
router.get('/getbyID/:id',(req,res)=>{
    var id=req.params.id 
    var query="select id,name,description,price from product where id=?"
    connection.query(query,[id],(err,result)=>{
        if(!err){
            return res.status(200).json(result[0])

        }
        else{
            return res.status(500).json(err)
        }
    })
})
router.patch('/update',(req,res)=>{
    var prod=req.body
    var query="update product set name=?,catogeryID=?,description=?,price=? where id=?"
    connection.query(query,[prod.id,prod.name,prod.catogeryID,prod.description.prod.price],(err,result)=>{
        if(!err){
            if(result.affectedRow==0){
                return res.status(404).json({message:"Product not exist"})
            }
            else{
                return res.status(200).json({message:"Product updated"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })

})
router.delete('/delete/:id',(req,res)=>{
    var id=req.params.id
    var query="delete from product where id=?"
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:"Product not exist"})
            }
            else{
                return res.status(200).json({message:"Product deleted"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })

   
})
router.patch('/updatestatus',(req,res)=>{
    var user=req.body;
   var query="update product set status=? where id=?"
    connection.query(query,[user.status,user.id],(err,result)=>{
        if(!err){
            if(result.affectedRowss==0){
                return res.status(404).json({message:"  Product not exist"})
            }
            else{
                return res.status(200).json({message:"Status  updated"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })
})




module.exports=router