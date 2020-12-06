import express from "express";
import { v4 as uuidv4 } from "uuid";
import { createRequire } from "module";
import pkg from "mongodb";
import bcrp from 'bcrypt';
import jwt from 'jsonwebtoken';

const require = createRequire(import.meta.url);
const router = express.Router();


const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://DavidCopoeru:davidutu123@cluster0.8lwht.mongodb.net/HousingSlack?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
    const collection = client.db("HousingSlack").collection("Forums");
  }); 


  