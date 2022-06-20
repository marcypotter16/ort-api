const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { findOneListingByName, getAll, main } = require('./functions');
const port = 8080;
require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')

const client = new MongoClient(process.env.DB_URL)
client.on('error', (err) => console.log(err))
client.once('open', () => console.log('Connected to db'))


module.exports = {
    client
}


app.use( jsonParser )

const dbase = client.db("marketplace")
const users = dbase.collection("utenti")
// const wantedFields = {
//     _id: 1,
//     nome: 1,
//     cognome: 1,
//     luogo: 1,
//     tel: 1
// }

const wantedFields = {
}

// Get all users
app.get('/users', async (req, res) => {
    const results = await users.find({}, {
        projection: wantedFields
    }).toArray();
    res.send(results)
})

// Get user by id
app.get('/users/:id', async (req, res) => {
    const id = new ObjectId(req.params.id)
    const results = await users.find( { _id: id }, { projection: wantedFields } ).toArray()
    res.send(results)
})

// Post new user
app.post('/users', async (req, res) => {
    const { nome, cognome, username, password, luogo, tel } = req.body
    await users.insertOne( { nome: nome, cognome: cognome, username: username, password: password, luogo: luogo, tel: tel } )
    res.status(201).send(`Inserted user with dati: '${nome}', '${cognome}', '${username}`)
})


app.listen( port, () => { console.log( "ALIVE" ) } )
