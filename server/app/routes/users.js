const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/me', function (req, res, next) {
  res.json({message: 'respond with a resource'})
})

module.exports = router
