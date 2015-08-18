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
