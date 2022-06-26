const Author = require('../models/author')
const Book = require('../models/book')

// display all authors
module.exports.authorIndex =  async ( req, res ) => {
    let searchOptions = {}
    if( req.query.name != null && req.query.name !== '' ){
        searchOptions.name = new RegExp( req.query.name, 'i' )
    }


    try{
        const authors = await Author.find(searchOptions)
       // res.send(authors)
        res.render( 'authors/index', {   
            authors: authors,
            searchOptions: req.query
         } )
         console.log(req.query)
    }catch(err){
        // res.status(500).json( { message: err.message } )
        res.redirect('/')
    }


    
}

/************************** */

module.exports.authorSingle = async ( req, res ) => {
    try {
        const author = await Author.findById( req.params.id )
        const books = await Book.find({ author: author.id }).limit(6).exec()

        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

/******************************** */


/************************** */

module.exports.authorEdit = async ( req, res ) => {
    try {
        const author = await Author.findById( req.params.id )
        res.render( 'authors/edit', { author: author } )
    } catch (error) {
        res.redirect('/authors')
    }
   
}

/******************************** */


/********** UPDATE AUTHOR **************** */

module.exports.authorUpdate = async ( req, res ) => {
    let author 

    try{
        author = await Author.findById( req.params.id )
        author.name = req.body.name
         await author.save()
        res.redirect(`/authors/${author.id}`)
    }catch{
        if( author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit', { 
                author: author,
                errorMessage: 'Error in updating author...'
             })
        }
        
    }

}

/******************************** */



/************ DELETE AUTHOR ************** */

module.exports.authorDelete = async ( req, res ) => {
    let author 

    try{
        author = await Author.findById( req.params.id )
         await author.remove()
        res.redirect('/authors')
    }catch{
        if( author == null){
            res.redirect('/')
        }else{
            res.redirect(`/authors/${author.id}`)
        }
        
    }
}

/******************************** */

module.exports.newAuthor = ( req, res ) => {
    res.render( 'authors/new', { author: new Author() } )
}



/************* CREATE AN AUTHOR ******************* */

module.exports.createAuthor = async ( req, res ) => {
 
    const author = new Author({
        name: req.body.name
    })
    console.log(req.body.name)
    try{
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    }catch{
       // res.status(400).json( { message: err.message })
        res.render('authors/new', { 
                        author: author,
                        errorMessage: 'Error in creating author...'
                     })
    }

}

