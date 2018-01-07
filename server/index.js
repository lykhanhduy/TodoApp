const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongojs = require('mongojs');
const db = mongojs('mongodb://solitary:123456@ds133816.mlab.com:33816/lykhanhduy2008', ['task']);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//nodejs and angular different port
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});

app.get('/api/task', (req,res) => {

  db.task.find( (err, docs) => {
    if(err) console.log(err);
    res.json(docs);
  })

})
app.put('/api/task/:id', (req,res) => {
  let task = req.body;
  let upTask = {};
  upTask.completed = req.body.completed;
  upTask.time = req.body.time;
  upTask.title = req.body.title;
  db.task.update({_id: mongojs.ObjectId(req.params.id)}, upTask, {} , function (err,doc) {
    res.json(doc);
  })
})
app.post('/api/task', (req,res) => {
  let task = req.body;
  console.log(task);
  db.task.insert(task,(err,task) => {
    res.json(task);
  })
})
app.delete('/api/task/:id', (req,res) => {
  db.task.remove({_id: mongojs.ObjectId(req.params.id)}, (err,doc) => {
    res.json(doc);
  })
})
app.post('/api/task/:id', (req,res) => {
  let task = req.body;
  let upTask = {};
  upTask.completed = req.body.completed;
  upTask.time = req.body.time;
  upTask.title = req.body.title;
  db.task.update({_id: mongojs.ObjectId(req.params.id)}, upTask, {} , function (err,doc) {
    res.json(doc);
  })
})
app.listen(3000);
