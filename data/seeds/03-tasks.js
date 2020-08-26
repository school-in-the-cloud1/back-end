exports.seed = async function(knex, Promise) {
  
  return knex('tasks').insert([
    {
      id: 111111111111,
      title: 'task one title',
      description: 'task one description',
    },
    {
      id: 222222222222,
      title: 'task two title',
      description: 'task two description',
    },
    {
      id: 33333333333,
      title: 'task three title',
      description: 'task three description',
    }
  ])
}