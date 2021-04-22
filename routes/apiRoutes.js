const fs = require("fs");
const path = require('path');
const uniqid = require('uniqid');
let noteList = require('../db/db.json');

module.exports = (app) => {

    app.post('/api/notes', (req, res) => {

        let newNote = req.body;
        newNote.id = uniqid();
        noteList.push(newNote);
        res.json(true);
        updateData();


    });

    app.get("/api/notes", function (req, res) {
        res.json(noteList);
    });


    app.delete('/api/notes/:id', function (req, res) {
        noteList = noteList.filter(({ id }) =>
            id !== req.params.id
        );
        updateData();
        res.json(noteList);

    });

    function updateData() {
        fs.writeFileSync("./db/db.json", JSON.stringify(noteList, '\t'), (err) => {
            if (err) throw err;
        });
    }
};
