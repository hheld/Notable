import request from 'superagent';

const url = '/api';

export function getAllNotes(from, to, tags) {
    return new Promise(
        function(resolve, reject) {
            var query = {};

            if(from) query.from = from;
            if(to) query.to = to;
            if(tags) query.tags = tags;

            request
            .get(url + '/notes')
            .query(query)
            .end(function(err, res) {
                if(err) {
                    return reject(err);
                }

                resolve(res.body);
            });
        }
    );
}

export function getNote(id) {
    return new Promise(
        function(resolve, reject) {
            request
            .get(url + '/note/' + id)
            .end(function(err, res) {
                if(err) {
                    return reject(err);
                }

                resolve(res.body);
            });
        }
    );
}

export function deleteNote(id) {
    return new Promise(
        function(resolve, reject) {
            request
            .del(url + '/note/' + id)
            .end(function(err, res) {
                if(err) {
                    return reject(err);
                }

                resolve(res.body);
            });
        }
    );
}

export function updateNote(id, note) {
    return new Promise(
        function(resolve, reject) {
            request
            .put(url + '/note/' + id)
            .send(note)
            .end(function(err, res) {
                if(err) {
                    return reject(err);
                }

                resolve(res.body);
            });
        }
    );
}

export function addNewNote(note) {
    return new Promise(
        function(resolve, reject) {
            request
            .post(url + '/note')
            .send(note)
            .end(function(err, res) {
                if(err) {
                    return reject(err);
                }

                resolve(res.body);
            });
        }
    );
}
