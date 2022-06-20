require('dotenv').config()
const express = require('express')
const { getAll, main } = require('../functions')
const { client } = require('../server')
const router = express.Router()

main(client).catch(console.error)

// Get All
router.get('/', async (_req, res) => {
    const result = await getAll(client, "listingsAndReviews3")
    res.send(result)
})

module.exports = router