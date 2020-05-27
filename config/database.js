import mongoose from 'mongoose'

var DB = {}

//DATABASE CONNECTION

DB.connection = mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(()=> {
    console.log('DATABASE: CONNECTED ✔️ ')})
  .catch((error) => {
    console.error("DATABASE: ERROR CONNECTION ! ❌ ", error);
    process.exit();
  })

// DATABASE Collections
DB.role = require('../models/role')
console.log("DATABASE: Collection Role Mounted ✔️")

DB.user = require('../models/user');
console.log("DATABASE: Collection User Mounted ✔️")

DB.ROLES = ["user", "admin", "moderator"];

module.exports = DB;