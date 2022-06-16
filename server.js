require('dotenv').config()

const express = require('express')
const expresslayouts = require('express-ejs-layouts')
const app = express()

require( './db/db_con' ) // connect to db

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use( expresslayouts )
app.use( express.static( 'public' ) )

app.use( "/", indexRouter )

app.listen( process.env.PORT || 3000 )