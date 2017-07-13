const express = require('express')
// const path = require('path')
const addToTasks = require('./knex')

const app = express()

app.put('/', (req, res) => {
  addToTasks()
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})
