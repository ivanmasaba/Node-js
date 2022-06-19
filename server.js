require('dotenv').config()

const express = require('express')
const expresslayouts = require('express-ejs-layouts')
// const bodyparser = require('body-parser')
const app = express()

require( './db/db_con' ) // connect to db

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use( expresslayouts )
app.use( express.static( 'public' ) )
// app.use(bodyparser.urlencoded( { limit: '10mb', extended: false } ))

app.use( "/", indexRouter )
app.use( "/authors", authorsRouter )

app.listen( process.env.PORT, () => {
    console.log( "server running on http://localhost:" + process.env.PORT );
} )