const express = require('express')
const app = express()
var bodyParser = require('body-parser')
<<<<<<< HEAD
const port = process.env.PORT||3000
const connection=require('./connection')
const router=require('./Routes/routes')
app.use(bodyParser.json)
=======
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT||3000
const connection=require('./connection')
const router=require('./Routes/routes')
app.use(bodyParser.json())
>>>>>>> e79d7a9fbf885b4b0ced332bc86126216cb0f1b8
app.use('/routes',router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)