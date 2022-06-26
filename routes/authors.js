const express = require('express')
const router = express.Router()
const authorController = require('../contollers/authorController')

// all authors
router.get( "/", authorController.authorIndex )


// new author page
router.get( "/new", authorController.newAuthor )


// get one author
router.get( "/:id", authorController.authorSingle )


// edit author page
router.get( "/:id/edit", authorController.authorEdit )


// update author
router.put( "/:id", authorController.authorUpdate )


// delete author
router.delete( "/:id", authorController.authorDelete )



// create, send info to db
router.post( "/", authorController.createAuthor )

module.exports = router