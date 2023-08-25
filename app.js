const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample in-memory task store
const tasks = [];

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.post('/addTask', (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push({ text: newTask, completed: false });
  }
  res.redirect('/');
});

app.post('/deleteTask', (req, res) => {
  const taskIndex = req.body.index;
  if (taskIndex !== undefined) {
    tasks.splice(taskIndex, 1);
  }
  res.redirect('/');
});

app.post('/toggleTask', (req, res) => {
  const taskIndex = req.body.index;
  if (taskIndex !== undefined && taskIndex < tasks.length) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
  }
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
