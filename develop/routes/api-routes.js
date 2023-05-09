const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('uuid');

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    console.error(err);
    res.json(JSON.parse(data));
  });
});

router.post('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    console.error(err);
    const notes = JSON.parse(data);
    req.body['uuid'] = uuid.v4();
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      console.error(err);
      res.json(req.body);
    });
  });
});

module.exports = router;
