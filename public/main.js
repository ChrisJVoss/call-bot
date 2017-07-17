const postTask = function (dataFromForm) {
let fetchData = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataFromForm)
}

fetch('http://localhost:3000/tasks', fetchData)
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err)
  })
}

var $myForm = document.getElementById('taskForm')

$myForm.addEventListener('submit', function (event) {
  event.preventDefault()

  let formData = new FormData($myForm)

  let data = {
    task: formData.get('task'),
    date: formData.get('date'),
    time: formData.get('time')
  }
  postTask(data)
  $myForm.reset()
})

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
//
