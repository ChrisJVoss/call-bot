const express = require('express')
const bodyParser = require('body-parser')
const tasks = require('./knex')
const path = require('path')
const moment = require('moment')
const request = require('request')
const ignored = require('./tokens.js')
const client = require('twilio')(ignored.sid, ignored.token)
const fs = require('fs')
const xml = require('xml')

const app = express()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const jsonParser = bodyParser.json()

app.use(staticMiddleware)

app.use(jsonParser)

app.post('/tasks', (req, res) => {
  tasks.add(req.body)
  .then(() => {
    res.sendStatus(200)
  })
})

app.post('/message.xml', (req, res) => {
  res.sendFile(__dirname + '/msg.xml')
})

app.get('/tasks', (req, res) => {
  tasks.list()
    .then( result => {
      res.json(result)
    })
})

app.get('/checkDate', (req, res) => {
  tasks.checkEntryByDate()
    .then( result => {
      res.json(result)
    })
})

app.listen(3000, () => {
  console.log('Listening on 3000!')
})

let currentTime = ''

setInterval(setCurrentTime, 5000)

function setCurrentTime() {
  currentTime = new Date()
}
setInterval(wrapper, 50000)

function wrapper() {
  tasks.checkEntryByDate()
  .then(value => {
    compareDates(currentTime, value)
  })
}
function compareDates(now, dates) {
  let timeNow = new Date()
  const todaysTodos = []
  for (let i = 0; i < dates.length; i++) {
    if (moment(now).isSame(dates[i].date, 'day')) {
      todaysTodos.push(dates[i])
    }
  }
  for (let i = 0; i < todaysTodos.length; i++) {
    let hour = parseInt(todaysTodos[i].time.slice(0, 2), 10)
    let minute = parseInt(todaysTodos[i].time.slice(3, 5), 10)
    let second = parseInt(todaysTodos[i].time.slice(6, 8), 10)
    let adjustedTime = timeNow.setHours(hour, minute, second)
    if (moment(now).isSame(adjustedTime, 'minute')) {
      let message = todaysTodos[i].task
      const finishedMessage = xml([ { Response: [ { Say: [ { _attr: { voice: 'alice'}}, message]}]}], { declaration: true})
      fs.writeFile('msg.xml', finishedMessage, (err) => {
        if (err) throw err
        console.log('Task has been written to msg.xml')
      })
      client.calls.create({
        url: 'http://87b11004.ngrok.io/message.xml',
        to: ignored.myPhone,
        from: '+15592064929'
      }, (err, call) => {
        if(err) {
          console.log(err)
        }
      })
    }
  }
}
