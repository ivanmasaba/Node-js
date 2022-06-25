// const path = require('path')
const Book = require('../models/book')
const express = require('express')
const router = express.Router()
const bookController = require('../contollers/bookController')

// const multer = require('multer')
// const uploadPath = path.join('public/', Book.coverImageBasePath)
// const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

// const upload = multer({    
//     dest: uploadPath,
//     fileFilter: ( req, file, callback ) => {
//         callback(null, imageMimeTypes.includes(file.mimetype))
//     }
// })

// all books
router.get( "/", bookController.bookIndex )


// new book page
router.get( "/new", bookController.newBook )


// create, send info to db
router.post( "/", bookController.createBook )

module.exports = router