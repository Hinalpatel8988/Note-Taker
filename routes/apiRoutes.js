const app = require('express').Router();
const fs = require('fs');
let db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

app.get('/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    res.json(db);
  });

app.post('/notes', (req, res) => {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
  
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db), 'utf-8');
  
    res.json(newNote);
  });

  app.delete('/notes/:id', (req, res) => {
    const db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  
    const newData = db.filter(note => parseInt(note.id) !== parseInt(req.params.id));
  
    fs.writeFileSync('./db/db.json', JSON.stringify(newData), (err, res) => {
      if(err) throw err;
    });
  
    res.json(newData);
  });

module.exports = app;