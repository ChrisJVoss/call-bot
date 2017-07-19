const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

const addToTasks = function(taskObject) {
  const query = knex
    .insert(taskObject)
    .into('todo')
  return query
}

const getTasks = function () {
  const query = knex
    .select('id', 'task', 'date', 'time')
    .from('todo')
  return query
}
module.exports = {
  addToTasks: addToTasks,
  getTasks: getTasks
}
