const express = require('express');

const Tasks = require('./tasksModel.js');
const restricted = require('../../auth/restricted-mw.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  Tasks.getAllTasks()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});

router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Tasks.getTaskById(id)
  .then(task => {
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get task' });
  });
});

router.post('/', restricted, (req, res) => {
  const task = req.body
  Tasks.addTask(task)
      .then(task => {
        res.status(201).json({ data: task });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
})

router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Tasks.getTaskById(id)
  .then(task => {
    if (task) {
      Tasks.updateTask(changes, id)
      .then(updatedTask => {
        res.json(updatedTask);
      });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update task' });
  });
});

router.delete('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Tasks.deleteTask(id)
  .then(deleted => {
    if (deleted) {
      res.json({ task: "deleted" });
    } else {
      res.status(404).json({ message: 'Could not find task with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete task' });
  });
});

module.exports = router;