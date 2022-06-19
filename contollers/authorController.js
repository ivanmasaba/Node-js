const Author = require('../models/author')

// display all authors
module.exports.authorIndex =  async ( req, res ) => {
    let searchOptions = {}
    if( req.query.name != null && req.query.name !== '' ){
        searchOptions.name = new RegExp( req.query.name, 'i' )
    }


    try{
        const authors = await Author.find({ searchOptions })
       // res.send(authors)
        res.render( 'authors/index', { 
            authors: authors,
            searchOptions: req.query
         } )
         console.log(req.query)
    }catch(err){
        res.status(500).json( { message: err.message } )
        res.redirect('/')
    }


    
}

module.exports.newAuthor = ( req, res ) => {
    res.render( 'authors/new', { author: new Author() } )
}

module.exports.createAuthor = async ( req, res ) => {
 
    const author = new Author({
        name: req.body.name
    })
    console.log(req.body.name)
    try{
        await author.save()
        // const newAuthor = await author.create()
      //  res.status(201).json(newAuthor)
        // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
    }catch{
       // res.status(400).json( { message: err.message })
        res.render('authors/new', { 
                        author: author,
                        errorMessage: 'Error in creating author...'
                     })
    }

}

