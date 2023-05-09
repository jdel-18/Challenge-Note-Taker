const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uniqid');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('./api/notes', (req, res) => {
    fs.readFile('.db/db.json', 'utf8', (err, data) => {
        console.err(err);
        res.json(JSON.parse(data));
    })
})
app.post('./api/notes', (req, res) => {
    fs.readFile('.db/db.json', 'utf8', (err, data) => {
        console.err(err);
        const notes = JSON.parse(data);
        req.body['uuid'] = uuid();
        notes.push(req.body);
        fs.writeFile('.db/db.json', JSON.stringify(notes), (err) =>{
            console.err(err);
            res.json(req.body);
        })
    })
})

app.get('notes', (req, res) => {
    res.sendFile(path.join(__dirname, './notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}!`)
);