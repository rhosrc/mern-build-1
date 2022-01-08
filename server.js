// Dependencies

require('dotenv').config();
const {
    PORT = 3001
} = process.env
// import express from 'express
const express = require('express');
// create application object
const app = express();
// import mongoose
const mongoose = require('mongoose');

// import middleware req => middleware => route => res

const cors = require('cors');
const morgan = require('morgan');





// DATABASE CONNECTION

// Establish Connection
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', function (err) {
    console.log(err.message + 'is mongo not running?');
})
db.on('connected', function () {
    console.log('mongo connected');
})
db.on('disconnected', function () {
    console.log('mongo disconnected');
})

// MODELS

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
})

const People = mongoose.model('People', PeopleSchema);

// Middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// TEST ROUTE

app.get('/', function (req, res) {
    res.send('hello world');
})

// PEOPLE INDEX ROUTE
// async/await

// app.get('/people', async function (req, res) {
//     try {
//         res.json(await People.find({}))
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })

// app.post('/people', async function (req, res) {
//     try {
//         res.json(await People.create(req.body));
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })

app.get('/people', async (req, res) => {
    try {
        res.json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})
// PEOPLE INDEX ROUTE - POST
app.post('/people', async (req, res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error);
    }
})
app.delete('/people/:id', async (req, res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
})

app.put('/people/:id', async (req, res) => {
    try {
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
        )
    } catch (error) {
        res.status(400).json(error);
    }
})

// LISTENER

app.listen(PORT, function () {
    console.log(`Listening on PORT ${PORT}`);
})