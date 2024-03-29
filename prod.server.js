const express = require('express')
const cors = require('cors')

const app = express()

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const router = express.Router()

var whitelist = ['https://www.lizhigang.cn']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get('/seller', cors(corsOptions), function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', cors(corsOptions), function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', cors(corsOptions), function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)

app.use(express.static('./dist'))

const port = process.env.PORT || 8900

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
