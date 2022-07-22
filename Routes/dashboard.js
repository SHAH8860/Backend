const express =require('express')
var router = express.Router()
var connection=require('../connection')
router.get('/detail',(req,res)=>{
    var categorycount;
    var productcount;
    var billcount;
    var query="select count(id) as categorycount from category"
    connection.query(query,(err,result)=>{
        if(!err){
            categorycount=result[0].categorycount

        }
        else{
            return res.status(500).json(err)
        }
    })
    var query="select count(id) as productcount from product"
    connection.query(query,(err,result)=>{
        if(!err){
           productcount=result[0].productcount

        }
        else{
            return res.status(500).json(err)
        }
    })
    var query="select count(id) as billcount from bill"
    connection.query(query,(err,result)=>{
        if(!err){
          billcount=result[0].billcount
          var data={
            categorycount:categorycount,
            productcount:productcount,
            billcount:billcount
          }
          return res.status(200).json(data)

        }
        else{
            return res.status(500).json(err)
        }
    })

})



module.exports=router