const mongoose = require('mongoose')
const moment = require('moment')
const Book = require('../models/book')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

/************************* */

// display all BOOKS
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

/***********Edit BOOK ******************* */

module.exports.bookEdit = async ( req, res ) => {
    try {
        const book = await Book.findById(req.params.id)
        renderEditPage(res, book )
    } catch (error) {
        res.redirect('/')
    }
}

/***********SHOW SINGLE BOOK******************* */

module.exports.bookSingle = async ( req, res ) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').exec()
        console.log(book.author.name)
        res.render('books/show',  {book: book} )
    } catch (error) {
        res.redirect('/')
    }
}

/*************NEW BOOK PAGE******************** */

module.exports.newBook = async ( req, res ) => {
    renderNewPage(res, new Book())
}


/**************UPDATE BOOK******************* */
module.exports.updateBook =  async ( req, res ) => {
   let book
   try {
    let book = await Book.findById(req.params.id)  
    book.title = req.body.title,
    book.author = mongoose.Types.ObjectId(req.body.author.trim()),//conver to valid mongo id
    book.publishDate = moment.utc(req.body.publishDate),//moment to convert time
    book.pageCount = req.body.pageCount,
    book.description = req.body.description
        if( req.body.cover != null && req.body.cover !== '' ){
                saveCover(book, req.body.cover)
        }

    await book.save()
    res.redirect(`/books/${book.id}`)
   } catch (error) {
            if( book != null ){
                renderEditPage(res, book, true)
            }else{
                redirect('/')
            }
   
   }

}



/**************CREATE A NEW BOOK******************* */
module.exports.createBook =  async ( req, res ) => {
  
   const book = new Book({
    title: req.body.title,
    author: mongoose.Types.ObjectId(req.body.author.trim()),//conver to valid mongo id
    publishDate: moment.utc(req.body.publishDate),//moment to convert time
    pageCount: req.body.pageCount,
    description: req.body.description
   })

   saveCover(book, req.body.cover)

   try {
    const newBook = await book.save()
    res.redirect(`books/${newBook.id}`)
   } catch (error) {
    renderNewPage(res, book, true)
   }

}


/******************************** */

/*************DELETE BOOK******************** */

module.exports.deleteBook = async ( req, res ) => {
    let book
    try {
        book = await Book.findById( req.params.id )
        await book.remove()
        res.redirect('/books/')
    } catch (error) {
        console.log(error)
        if( book != null ){
            res.render( 'books/show', { book: book, errorMessage: 'Could not delete book' } )
        }else{
            res.redirect('/')
        }
    }
}

// FUNCTIONS ******************

function saveCover(book, coverEncoded){
    if( coverEncoded == null ){
        return
    }

    const cover = JSON.parse( coverEncoded )
    if( cover != null && imageMimeTypes.includes(cover.type) ){
        book.coverImage = new Buffer.from( cover.data, 'base64' )
        book.coverImageType = cover.type
    }
}



async function renderNewPage(res, book, hasError=false){
    renderFormPage(res, book, 'new', hasError=false)
}

async function renderEditPage(res, book, hasError=false){
    renderFormPage(res, book, 'edit', hasError=false)
}

async function renderFormPage(res, book, form, hasError=false){
    try {
        const authors = await Author.find({})
        const params = {authors: authors, book: book}
            if(hasError){
                if( form === 'new' ){
                    params.errorMessage = 'Error creating new book'
                }else if( form === 'edit' ){
                    params.errorMessage = 'Error updating book'
                }
            }
        res.render(`books/${form}`, params)
      } catch (error) {
       res.redirect('/books')
      }
}