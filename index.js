import 'dotenv/config';
import { role } from './seeds/role_seeds.js';

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

// DATABASE
const DATABASE = require('./config/database.js')
const DATABASE_SEEDS = require('./seeds/role_seeds')
DATABASE_SEEDS.role()


// HEADER
app.use((request,response,next) =>{
    response.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})


// ROUTER
let router = require('./routes/route')
app.use('/',router)

let router_api = require('./routes/api')
app.use('/api',router_api)

let router_admin = require('./routes/admin')
app.use('/admin',router_admin)


//Server
app.listen(process.env.PORT,()=>{
    console.log(`Application listen in port ${process.env.PORT}`)
})