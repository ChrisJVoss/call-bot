const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

const add = function(taskObject) {
  const query = knex
    .insert(taskObject)
    .into('todo')
  return query
}

const list = function () {
  const query = knex
    .select('id', 'task', 'date_text', 'time_text')
    .from('todo')
    .orderBy('date')
    .orderBy('time')
  return query
}
module.exports = {
  add: add,
  list: list
}
