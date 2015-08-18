/* jshint node: true */

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8080,
    morgan      = require('morgan'),
    compression = require('compression'),
    path        = require('path'),
    noteRestApi = require('./NoteRestApi');

app.use(morgan('short'));

app.use(compression());
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/api', noteRestApi);

app.listen(port);
console.log('Started server on port ' + port);
