import 'dotenv/config';
import { role } from './seeds/role_seeds.js';

// EXPRESS
const express= require('express')
const app = express()
const bodyParser = require('body-parser')
const session  = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

// DATABASE
const DATABASE = require('./config/database.js')
const DATABASE_SEEDS = require('./seeds/role_seeds')
DATABASE_SEEDS.role()
//Midleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({cookie: { maxAge:360000, secure: false }}))
app.use(flash())

// HEADER

app.use((request,response,next) =>{
    request.flash('title',process.env.APP_NAME)
    response.locals = request.flash()
    response.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})
// ROUTER
let router = require('./routes/route')
let router_api = require('./routes/api')
app.use('/',router)
app.use('/api',router_api)
app.use('/assets',express.static('public'))


//Server
app.listen(process.env.PORT,()=>{
    console.log(`Application listen in port ${process.env.PORT}`)
})