const router = require('express').Router()
const filter = require('./controller/filter.controller')
router.get("/filter",filter.filterFun)
module.exports = router
