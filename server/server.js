/* jshint node: true */

var express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8080,
    morgan      = require('morgan'),
    compression = require('compression'),
    path        = require('path'),
    noteRestApi = require('./NoteRestApi'),
    bodyParser  = require('body-parser');

app.use(morgan('short'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/thirdParty', express.static(path.join(__dirname, '../node_modules')));
app.use('/api', noteRestApi);

app.listen(port);
console.log('Started server on port ' + port);
