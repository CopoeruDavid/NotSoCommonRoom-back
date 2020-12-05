import express from "express";
import { v4 as uuidv4 } from "uuid";
import { createRequire } from "module";
import pkg from "mongodb";
import bcrp from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
// import verify from '../jwt_check.js';

const { ObjectID, ObjectId } = pkg;

const require = createRequire(import.meta.url);
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://DavidCopoeru:davidutu123@cluster0.8lwht.mongodb.net/HousingSlack?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const saltRounds = 10;

let users = [
  {
    firstName: "David",
    lastName: "Copoeru",
    age: 20,
    id: uuidv4(),
  },
];

router.get("/", (req, res) => {
  client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Users");
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
      console.log(result);
    });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);

  const user = req.body;

  client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Users");
    bcrp.genSalt(saltRounds, function(err, salt) {
      bcrp.hash(user.password, salt, function(err, hash) {
        const result = collection.insertOne({
          f_name: user.f_name,
          l_name: user.l_name,
          email: user.email,
          password: hash,
          age: user.age,
        });
      });
    });
  });

  res.send(`User with the name ${user.f_name} added to the database`);
  console.log(`User with the name ${user.f_name} added to the database`);
});

// router.get("/:id", (req, res) => {
//   const id_get = req.params.id;
//   console.log(id_get);

//   client.connect((err) => {
//     const collection = client.db("HousingSlack").collection("Users");
//     collection.find(ObjectId(id_get)).toArray(function (err, result) {
//       if (err) throw err;
//       res.send(result);
//       console.log(result);
//     });
//   });
// });

router.post("/login", (req, res) => {

  const user = req.body;
  
  const email = user.username;
  const password = user.password;
  var connected = 2;

  // console.log(email);
  // console.log(password);

  client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Users");

    collection.find({"email": email}).toArray(function (err, result) {
      if (err) res.sendStatus(205);
      // console.log(result[0].password);
      if(result){
      bcrp.compare(password, result[0].password, function(err, resultt) {
        
        if(resultt){
        connected = 1;
        // console.log("haz");
        const token = jwt.sign({ _id: result[0]._id}, "sdasdasdaghukjashfyugiae", { expiresIn: 20});
        res.header('auth-token', token).send(token);
        // console.log(token);
        }else{
          res.sendStatus(205);
        }

      });
      }
      else{
        res.sendStatus(206);
      }
    });
  });

});

router.post("/getUser", (req,res) => {

  var token = req.body.auth_token;
  var decoded = jwt.decode(token);


  const id = decoded._id;

  console.log(id);
  
  client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Users");
    collection.find(ObjectId(id)).toArray(function (err, result) {
      if (err) throw err;
      res.send(result[0]);
      console.log(result[0]);
    });
  });

})

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Users");
    collection.deleteOne({ _id: ObjectId(id) });
    res.send(`User with the id ${id} deteleted from the database`);
  });
});

// router.post("/:id", (req, res) => {
//   const id = req.params.id;

//   const user = req.body;

//   console.log(user.l_name);

//   client.connect((err) => {
//     const collection = client.db("HousingSlack").collection("Users");
//     collection.find(ObjectId(id)).toArray(function (err, result) {
//       if (err) throw err;
//       result = collection.insertOne({
//         f_name: user.f_name,
//         l_name: user.l_name,
//         age: user.age,
//       });
//       res.send(result);
//       console.log(result);
//     });
//   });

//   res.send(`User with ${id} change its details`);
// });

// router.get('/userInfo', verify, (req,res) => {


// })

export default router;
