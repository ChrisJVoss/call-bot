const express = require('express')
// const path = require('path')
const bodyParser = require('body-parser')
const addToTasks = require('./knex')

const app = express()
const jsonParser = bodyParser.json()

app.use(jsonParser)

app.post('/tasks', (req, res) => {
  addToTasks(req.body)
  console.log(req.body)
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
