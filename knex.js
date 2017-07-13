const knex = require('knex') ({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/to-do'
})

const addToTasks = function(taskObject) {
  console.log(taskObject)
  const query = knex
    .insert(taskObject)
    .into('todo')
  console.log(query.toString())

  query
    .then(() => {
      console.log('Done!')
    })
}
module.exports = addToTasks
