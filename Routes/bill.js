const express =require('express')
const uuid =require('uuid')
var router = express.Router()
var pdf=require('html-pdf')
var path=require('path')
var fs=require('fs')
var connection=require('../connection')
module.exports=router
router.post('/report',(req,res)=>{
    var prod=req.body
    var generateid=uuid.v1()
    var productdetail=JSON.parse(prod.productdetail)
    var query="insert into bill(name,uuid,email,contactnumber,paymentmethod,total,description,creadtedby) values(?,?,?,?,?,?,?,?)"
    connection.query(query,[prod.name,generateid,prod.email,prod.contactnumber,prod.paymentmethod,prod.total,prod.description,res.locals.email],(err,result)=>{
        if(!err){
            pdf.create(result).toFile('./generatepdf'+generateid+".pdf",(err,result)=>{
                if(!err){
                    return res.status(200).json({uuid:generateid})
                }
                else{
                    return res.status(500).json(err)
                }
            })

            
        }
        else{
            return res.status(500).json(err)
        }

    })
})
router.delete('/delete/:id',(req,res)=>{
    var id=req.params.id
    var query="delete from bill where id=?"
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:"Product not exist"})
            }
            else{
                return res.status(200).json({message:"Bill deleted"})
            }

        }
        else{
            return res.status(500).json(err)
        }
    })

   
})