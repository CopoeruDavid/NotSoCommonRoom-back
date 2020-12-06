import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import userRoutes from './routes/users.js';
// import mongoose from 'mongoose';
// import { createRequire } from "module";
// import { MongoClient } from 'mongodb';
// const require = createRequire(import.meta.url);

const app = express();
const PORT = 5000;



// const cors = require ('cors');


app.use(bodyParser.json());
app.use(cors());

// app.use('/users', userRoutes);

app.get('/', (req,res)=> {
    res.send('Hatz')
})

// const client = new MongoClient()
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://DavidCopoeru:davidutu123@cluster0.8lwht.mongodb.net/HousingSlack?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

app.listen(PORT, () => console.log(`Server Running on: hhtp://localhost:${PORT}`));