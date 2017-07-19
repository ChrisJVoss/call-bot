const postTask = function (dataFromForm) {
let fetchData = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataFromForm)
}

return fetch('http://localhost:3000/tasks', fetchData)
  .then()
  .catch()
}

const $myForm = document.getElementById('taskForm')

$myForm.addEventListener('submit', function (event) {
  event.preventDefault()

  let formData = new FormData($myForm)

  let data = {
    task: formData.get('task'),
    date: formData.get('date'),
    time: formData.get('time')
  }
  postTask(data)
    .then(() => {
      $myForm.reset()
      fetchFunction()
    })

})

const $taskList = document.getElementById('taskList')

document.addEventListener('DOMContentLoaded', event => {
  fetchFunction()
})
const fetchFunction = function() {
  fetch('http://localhost:3000/tasks')
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
const renderTasks = function(todoList) {
  const $todo = document.createElement('li')
  const $task = document.createElement('p')
  const $date = document.createElement('p')
  const $time = document.createElement('p')
  $todo.classList.add('collection-item')
  const { task, date, time } = todoList
  $task.textContent = task
  $date.textContent = date
  $time.textContent = time
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
