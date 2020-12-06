import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ejs from 'ejs';
import userRoutes from './routes/users.js';
// import mongoose from 'mongoose';
import { createRequire } from "module";
// import { MongoClient } from 'mongodb';
const require = createRequire(import.meta.url);
const socketio = require('socket.io');
const http = require('http');
const path = require('path');


const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);


app.listen(PORT, () => console.log(`Server Running on: hhtp://localhost:${PORT}`));