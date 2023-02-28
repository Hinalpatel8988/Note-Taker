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

app.delete('/notes/:id', (request, response) => {
    let noteId = request.params.id.toString();
    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const newData = data.filter( note => note.id.toString() !== noteId );
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    console.log(`\nSuccessfully deleted note : ${noteId}`);
    response.json(newData);
});

module.exports = app;