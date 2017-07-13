const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

const addToTasks = function() {
  const query = knex
    .insert({task: 'Walk the dog.', time: '7:00 pm', buffer: '15 min'})
    .into('todo')
  console.log(query.toString())

  query
    .then(() => {
      console.log('Done!')
    })
}
module.exports = addToTasks
