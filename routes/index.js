const express = require('express')
const router = express.Router()
const siteController = require('../contollers/siteController')

router.get( "/", siteController.siteIndex )

module.exports = router