const express = require('express')
const router = express.Router()
const authorController = require('../contollers/authorController')

// all authors
router.get( "/", authorController.authorIndex )


// new author page
router.get( "/new", authorController.newAuthor )


// create, send info to db
router.post( "/", authorController.createAuthor )

module.exports = router