const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3002;
const app = express();
const allNotes = require('./db/db.json');

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(allNotes.slice(1));
});

// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



//Add note

function addNewNote(body, allNotes) {
  const newNote = body;
  if (!Array.isArray(allNotes))
  allNotes = [];
  
  if (allNotes.length === 0)
  allNotes.push(0);

  body.id = allNotes[0];
  allNotes[0]++;

  allNotes.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(allNotes, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = addNewNote(req.body, allNotes);
  res.json(newNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
