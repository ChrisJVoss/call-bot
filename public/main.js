function postTask(dataFromForm) {
let fetchData = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataFromForm)
}

return fetch('/tasks', fetchData)
  .then()
  .catch()
}

const $myForm = document.getElementById('task-form')

$myForm.addEventListener('submit', function (event) {
  event.preventDefault()

  let formData = new FormData($myForm)

  let data = {
    task: formData.get('task'),
    date: formData.get('date'),
    date_text: formData.get('date'),
    time: formData.get('time'),
    time_text: formData.get('time')
  }
  postTask(data)
    .then(() => {
      $myForm.reset()
      getTaskList()
    })

})

const $taskList = document.getElementById('task-list')

document.addEventListener('DOMContentLoaded', event => {
  getTaskList()
})
function getTaskList() {
  fetch('/tasks')
    .then(response => {
      return response.json()
    })
    .then(taskList => {
      $taskList.innerHTML = ''
      taskList
        .map(renderTasks)
        .forEach($task => {
          $taskList.appendChild($task)
        })
    })
}
function renderTasks(todo) {
  const $todo = document.createElement('li')
  const $task = document.createElement('p')
  const $date = document.createElement('p')
  const $time = document.createElement('p')
  $todo.classList.add('collection-item')
  const { task, date_text, time_text } = todo
  $task.textContent = task
  $date.textContent = date_text
  $time.textContent = time_text
  $todo.appendChild($task)
  $todo.appendChild($date)
  $todo.appendChild($time)
  return $todo
}

class HashRouter {
  constructor($views) {
    this.$views = $views
    this.isListening = false
  }
  match(hash) {
    const viewId = hash.replace('#', '')
    this.$views.forEach($view => {
      if ($view.id === viewId) {
        $view.classList.remove('hidden')
      }
      else {
        $view.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })
    this.isListening = true
  }
}

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
/*
const ignored = require('./tokens.js')
const client = require('twilio')(ignored.sid, ignored.token)

client.calls.create({
  url: 'http://ed1caa1e.ngrok.io/message.xml',
  to: ignored.myPhone,
  from: '+15592064929'
}, (err, call) => {
  if(err) {
    consle.log(err)
  } else {
    console.log(call.sid)
  }
})
*/

$('.timepicker').pickatime({
    default: 'now',
    twelvehour: 'AM/PM',
    donetext: 'OK',
  autoclose: false,
  vibrate: true
});

$('.datepicker').pickadate({
  selectMonths: true,
  selectYears: 15
});
