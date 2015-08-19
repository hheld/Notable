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