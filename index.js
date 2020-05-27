import 'dotenv/config';

// EXPRESS
const express= require('express')
const app = express()
app.use('/assets',express.static('public'))
app.set('view engine', 'ejs');

//Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('secret'))

// Cors
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:8081",
    credentials: true
}))

//SEED
const Seed = require('./seeds/seeds')
Seed.role()

// ROUTER

let router = require('./routes/route')
app.use(router)

let router_api = require('./routes/api')
app.use('/api',router_api)

let router_admin = require('./routes/admin')
app.use('/admin',router_admin)


//Server
app.listen(process.env.PORT,()=>{
    console.log(`SERVER: Listen in PORT:${process.env.PORT} ✔️`)
})