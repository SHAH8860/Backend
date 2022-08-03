const express =require('express')
const uuid =require('uuid')
var router = express.Router()
var pdf=require('html-pdf')
var path=require('path')
var fs=require('fs')
var connection=require('../connection')
var ejs=require('ejs')

router.post('/report',(req,res)=>{
    var prod=req.body
    var generateid=uuid.v1()
    var productdetail=JSON.parse(prod.description)
    var query="insert into bill(name,uuid,email,contactnumber,paymentmethod,total,description,createdby) values(?,?,?,?,?,?,?,?)"
    connection.query(query,[prod.name,generateid,prod.email,prod.contactnumber,prod.paymentmethod,prod.total,prod.description,res.locals.email],(err,result)=>{
        if(!err){
            ejs.renderFile(path.join(__dirname,'card.ejs'),{productdetail:productdetail,name:prod.name,email:prod.email,contactnimber:prod.contactnumber,paymentmethod:prod.paymentmethod,total:prod.total})

            
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




module.exports=router