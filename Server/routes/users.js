var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var User = require("../models/user");
var config = require("../config/database");
var jwt = require("jsonwebtoken");

var router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var validator = require('gstin-validator');

router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    emailid: req.body.emailid,
    password: req.body.password,
    role: req.body.role
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err)
      res.json({ success: false, msg: "Failed to save user" });
    } else {
      res.json({ success: true, msg: "User Added Successfully" });
    }
  });
});

router.post("/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  console.log(password);

  User.getUserByUserName(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).send({
        message: "User Not Found"
      });
    }
  
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 1800 // 30 minutes
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            name: user.name,
            username: user.username,
            emailid: user.emailid,
            rolename: user.role
          }
        });
      } else {
        res.status(400);
        res.send({
          message: "Invalid Password, Please enter a valid password"
        });
      }
    });
  });
});


// router.post("/authenticateLDAP", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
  
//   console.log(password);

  
//   authenticate(username,password).then((res) => {
//     if (isMatch) {
//       const token = jwt.sign({ data: user }, config.secret, {
//         expiresIn: 1800 // 30 minutes
//       });

//       res.json({
//         success: true,
//         token: "JWT " + token,
//         user: {
//           name: user.name,
//           username: user.username,
//           emailid: user.emailid,
//           rolename: user.role
//         }
//       });
//     } else {
//       res.status(400);
//       res.send({
//         message: "Invalid Password, Please enter a valid password"
//       });
//     }
//   } 
//   ).catch((err) => {

//   }

//   User.getUserByUserName(username, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       return res.status(400).send({
//         message: "User Not Found"
//       });
//     }
  
//     User.comparePassword(password, user.password, (err, isMatch) => {
//       if (err) throw err;
//       if (isMatch) {
//         const token = jwt.sign({ data: user }, config.secret, {
//           expiresIn: 1800 // 30 minutes
//         });

//         res.json({
//           success: true,
//           token: "JWT " + token,
//           user: {
//             name: user.name,
//             username: user.username,
//             emailid: user.emailid,
//             rolename: user.role
//           }
//         });
//       } else {
//         res.status(400);
//         res.send({
//           message: "Invalid Password, Please enter a valid password"
//         });
//       }
//     });
//   });
// });

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (err) {
      res.json({ name: "sundar" });
    } else {
      res.json({ user: req.user });
    }
  }
);

router.get("/validate", (req, res) => {
  res.send("Validated");
});

let authenticate = ( username, password ) => {
  return new promise ((resolve , reject) => {
    const ldapClient = ldap.createClient(ldapoptions); 
    ldapClient.on('error', error => {
     callBack(err);
 });
 
    console.log('entering2',username);
    var ldapdomain = "SQS" + '\\' + username;
    console.log('ldapdomain',ldapdomain);
    ldapClient.bind(
    ldapdomain, password,(err, res)=> {
        if(err) {
         callback(err);
          console.log('error1pandi');
          return reject(err);
            }
      //  ldapClient.destroy();
        return resolve(res);
    });
    ldapClient.destroy();
 });
 }
 const ldapoptions = {
  url: 'LDAP://192.168.65.5:389',
  idleTimeout: 1000000,
  reconnect:true
 }

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
