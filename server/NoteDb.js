var sqlite3 = require('sqlite3'),
    path    = require('path'),
    db      = new sqlite3.Database(path.join(__dirname, 'notes.sdb'));

(function createDatabaseStructure() {
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS Notes (" +
            "Id           INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "Title        TEXT, " +
            "Tags         TEXT, " +
            "CreationDate TEXT, " +
            "LastModDate  TEXT, " +
            "Note         TEXT " +
        ")");
    });
}());

function constructTagQueryCondition(tags) {
    if(!tags) {
        return null;
    }

    var arrayTags = tags.split(' ');

    return arrayTags.reduce(function(prev, current, idx, arr) {
        return prev + "Tags LIKE '%" + current + "%'" + (idx<arr.length-1 ? " OR " : "");
    }, '');
}

exports.getAllNotes = function(from, to, tags) {
    // here we assume that tags is a string containing a list of space separated tags!!
    return new Promise(
        function(resolve, reject) {
            var notes = [];

            var queryString = "SELECT * FROM Notes WHERE LastModDate>=" + from + " AND LastModDate<=" + to;

            if(tags) {
                queryString += " AND (" + constructTagQueryCondition(tags) + ")";
            }

            db.each(queryString, function(err, row) {
                if(!row) {
                    return reject('Query for notes returned no results!');
                }

                var note = {
                    id           : row.Id,
                    title        : row.Title,
                    tags         : row.Tags,
                    creationDate : new Date(row.CreationDate),
                    lastModDate  : new Date(row.LastModDate),
                    note         : row.Note
                };

                notes.push(note);
            }, function(err, numRows) {
                if(err) {
                    reject(err);
                } else {
                    resolve(notes);
                }
            });
        }
    );
};

exports.getNote = function(id) {
    return new Promise(
        function(resolve, reject) {
            var note = {};

            db.each("SELECT * FROM Notes WHERE Id=" + id, function(err, row) {
                if(!row) {
                    return reject('Query for note returned no result.');
                }

                note.id           = row.Id;
                note.title        = row.Title;
                note.tags         = row.Tags;
                note.creationDate = new Date(row.CreationDate);
                note.lastModDate  = new Date(row.LastModDate);
                note.note         = row.Note;
            }, function(err, numRows) {
                if(err) {
                    reject(err);
                } else {
                    resolve(note);
                }
            });
        }
    );
};

exports.addNote = function(note) {
    return new Promise(
        function(resolve, reject) {
            var stmt = db.prepare("INSERT INTO Notes (Title, Tags, CreationDate, LastModDate, Note) VALUES (?,?,?,?,?)");

            stmt.run([note.title, note.tags, note.creationDate, note.lastModDate, note.note], function(err) {
                if(err) {
                    return reject(err);
                }
            });

            stmt.finalize(function() {
                resolve();
            });
        }
    );
};

exports.deleteNote = function(id) {
    return new Promise(
        function(resolve, reject) {
            db.run("DELETE FROM Notes WHERE Id=?", id, function(err){
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    );
};
