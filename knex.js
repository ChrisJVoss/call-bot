const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

function add(task) {
  const query = knex
    .insert(task)
    .into('todo')
  return query
}

function list() {
  const query = knex
    .select('id', 'task', 'date_text', 'time_text')
    .from('todo')
    .orderBy('date')
    .orderBy('time')
  return query
}

function checkEntryByDate() {
  const query = knex
    .select('id', 'date', 'time', 'task')
    .from('todo')
    .orderBy('date')
    .orderBy('time')
  return query
}

module.exports = {
  add: add,
  list: list,
  checkEntryByDate: checkEntryByDate
}
