const express = require('express')
// const path = require('path')
const bodyParser = require('body-parser')
const addToTasks = require('./knex')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const jsonParser = bodyParser.json()

app.use(staticMiddleware)

app.use(jsonParser)

app.post('/tasks', (req, res) => {
  addToTasks(req.body)
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
//
