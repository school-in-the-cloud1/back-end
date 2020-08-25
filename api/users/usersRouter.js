const router = require('express').Router();

const Users = require('./usersModel.js');
const restricted = require('../../auth/restricted-mw.js');

router.get('/', (req, res) => {
  Users.getAllUsers()
    .then(users => {
      res.status(200).json({data:users, jwt:req.decodedToken});
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;
  
  Users.getUserById(id)
    .then(user => {
      res.status(200).json({data:user});
    })
    .catch(err => res.send(err));
});

router.post('/filter', (req, res) => {
  const filters = req.body;
  Users.filterUsersBy(filters)
    .then(users => {
      res.status(200).json({data:users});
    })
    .catch(err => res.send(err));
});

router.delete('/:id', restricted,(req, res) => {
  const  {id}  = req.params;

  Users.deleteUser(id)
  .then(deleted => {
    if (deleted) {
      res.json({ message: 'user deleted' });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});


module.exports = router;