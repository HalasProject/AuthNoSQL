import mongoose from 'mongoose'
let DB = {}

//DATABASE CONNECTION
DB.connection = mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('DATABASE: CONNECTED ✔️ ')
}).catch((err)=>{
  console.error("DATABASE: ERROR CONNECTION ! ❌ ", err);
  process.exit();
})

// DATABASE TABLE

DB.role = require('../models/user/role')
console.log("DATABASE: Collection Role Mounted ✔️")
DB.user = require('../models/user/user');
console.log("DATABASE: Collection User Mounted ✔️")
DB.ROLES = ["user", "admin", "moderator"];


module.exports = DB;