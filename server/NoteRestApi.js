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

router.post('/note', function(req, res) {
    noteDb.addNote(req.body)
    .then(function() {
        res.json('Successfully added note.');
    })
    .catch(function(err) {
        res.json('There was an error trying to add this note: ', req.body);
    });
});

router.route('/note/:id')
.all(function(req, res, next) {
    req.noteId = req.params.id;
    next();
})
.get(function(req, res) {
    noteDb.getNote(req.noteId)
    .then(function(note) {
        res.json(note);
    })
    .catch(function(err) {
        res.json('There was an error trying to get a note: ' + err);
    });
})
.put(function(req, res) {

})
.delete(function(req, res) {
    noteDb.deleteNote(req.noteId)
    .then(function() {
        res.json('Successfully deleted note with id ' + req.noteId);
    })
    .catch(function(err) {
        res.json('There was an error trying to delete note with id ' + req.noteId + ': ' + err);
    });
});

module.exports = router;
