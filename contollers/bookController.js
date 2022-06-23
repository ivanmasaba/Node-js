const path = require('path')
const mongoose = require('mongoose')
const moment = require('moment')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public/', Book.coverImageBasePath)
const fs = require('fs')

// display all authors
module.exports.bookIndex =  async ( req, res ) => {
    let query =  Book.find()

    if( req.query.title != null && req.query.title != '' ){
        query = query.regex( 'title', new RegExp( req.query.title, 'i' ) )
    }

    if( req.query.publishedBefore != null && req.query.publishedBefore != '' ){
       query = query.lte( 'publishDate', req.query.publishedBefore )
    }

    if( req.query.publishedAfter != null && req.query.publishedAfter != '' ){
        query = query.gte( 'publishDate', req.query.publishedAfter )
     }

   try {
    const books = await query.exec()
    res.render( 'books/index', {
        books: books,
        searchOptions: req.query
    } )
   } catch (error) {
        res.redirect('/')
   }
}

module.exports.newBook = async ( req, res ) => {
    renderNewPage(res, new Book())
}

module.exports.createBook =  async ( req, res ) => {
    console.log(req.body)
  const fileName =  req.file != null ? req.file.filename : null
   const book = new Book({
    title: req.body.title,
    author: mongoose.Types.ObjectId(req.body.author.trim()),//conver to valid mongo id
    publishDate: moment.utc(req.body.publishDate),//moment to convert time
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description
   })

   try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
   } catch (error) {
    if( book.coverImageName != null ){
        removeBookCover( book.coverImageName )
    }
    renderNewPage(res, book, true)
    console.log(error)
   }

}

function removeBookCover( fileName ){
    fs.unlink( path.join(uploadPath, fileName ), err => {
        if(err) console.error(err)
    } )
}

async function renderNewPage(res, book, hasError=false){
    try {
        const authors = await Author.find({})
        const params = {authors: authors, book: book}
        if(hasError) params.errorMessage = 'Error creating new book'
        res.render('books/new', params)
      } catch (error) {
       res.redirect('/books')
      }
}

