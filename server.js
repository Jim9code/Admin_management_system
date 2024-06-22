const express = require('express')
const dotenv = require('dotenv')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')
const mysql = require('mysql2')
dotenv.config()


 const app = express()
 const port = process.env.PORT

//  parsing midleware
app.use(bodyparser.urlencoded({extended: false}))
// parse application/json
app.use(bodyparser.json())

app.use(express.static('public'))







const routes = require('./server/routes/app-route')
app.use('/', routes)





  





 app.listen(port,()=>{
    console.log(`server listening on port: ${port}`)
 })  