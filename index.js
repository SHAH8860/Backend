const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT||3000
const connection=require('./connection')
const router=require('./Routes/routes')
app.use(bodyParser.json)
app.use('/routes',router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)