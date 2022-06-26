const Book = require('../models/book')
const express = require('express')
const router = express.Router()
const bookController = require('../contollers/bookController')


// all books
router.get( "/", bookController.bookIndex )


// new book page
router.get( "/new", bookController.newBook )

// get single book
router.get( "/:id", bookController.bookSingle )


// show edit book page
router.get( "/:id/edit", bookController.bookEdit )


// get single book
router.put( "/:id", bookController.updateBook )


// get single book
router.delete( "/:id", bookController.deleteBook )


// create, send info to db
router.post( "/", bookController.createBook )

module.exports = router