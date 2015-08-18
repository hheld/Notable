var express = require('express'),
    router  = express.Router(),
    noteDb  = require('./NoteDb');

/* E.g.: /notes?from=2014-08-21T00:00:00&to=2014-08-25T15:45:12&tags=tag1%20tag2 */
router.get('/notes', function(req, res) {
    var from = Date.parse(req.query.from) || 0x00000000,
        to   = Date.parse(req.query.to)   || 0x7FFFFFFF,
        tags = req.query.tags             || '';

    noteDb.getAllNotes(from, to, tags)
    .then(function(notes) {
        res.json(notes);
    })
    .catch(function(err) {
        res.json('There was an error trying to get the notes: ' + err);
    });
});

/* E.g.: /note/1 */
router.get('/note/:id', function(req, res) {
    var noteId = req.params.id;

    if(!noteId) {
        return res.json('Could not get note with id ' + noteId);
    }

    noteDb.getNote(noteId)
    .then(function(note) {
        res.json(note);
    })
    .catch(function(err) {
        res.json('There was an error trying to get a note: ' + err);
    });
});

router.post('/note', function(req, res) {
    noteDb.addNote(req.body)
    .then(function() {
        res.json('Successfully added note.');
    })
    .catch(function(err) {
        res.json('There was an error trying to add this note: ', req.body);
    });
});

router.delete('/note/:id', function(req, res) {
    var noteId = req.params.id;

    if(!noteId) {
        return res.json('Could not delete note with id ' + noteId);
    }

    noteDb.deleteNote(noteId)
    .then(function() {
        res.json('Successfully deleted note with id ' + noteId);
    })
    .catch(function(err) {
        res.json('There was an error trying to delete note with id ' + noteId + ': ' + err);
    });
});

module.exports = router;
