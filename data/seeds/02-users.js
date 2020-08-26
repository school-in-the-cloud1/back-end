exports.seed = async function(knex, Promise) {
  
  return knex('users').insert([
    {
      id: 111111111111,
      username: 'admin',
      password: 'adminpassword',
      email: 'admin@email.com',
      role: 'admin',
    },
    {
      id: 222222222222,
      username: 'volunteer',
      password: 'volunteerpassword',
      email: 'volunteer@email.com',
      role: 'volunteer',
    },
    {
      id: 33333333333,
      username: 'student',
      password: 'studentpassword',
      email: 'student@email.com',
      role: 'student',
    }
  ])
}