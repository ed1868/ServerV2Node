const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
// isLoggedIn

router.get('/secret', (req, res, next) => {
  res.json({
    secret: 42,
    user: "YA BOY",
  })
})

module.exports = router
