const DB = require('../config/database')

export function role(){
    DB.role.estimatedDocumentCount((error, count) => {
      if (!error && count === 0) {
        new DB.role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Added 'user' role ✔️");
        });
  
        new DB.role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Added 'Moderator' to role ✔️");
        });
  
        new DB.role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("Added 'Admin' to role ✔️");
        });
      }
    });
}
