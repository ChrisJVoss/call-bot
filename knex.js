const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

const addToTasks = function(taskObject) {
  const query = knex
    .insert(taskObject)
    .into('todo')
  query
    .then()
}
module.exports = addToTasks
