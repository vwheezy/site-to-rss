const express = require('express');
const createError = require('http-errors');
require('express-async-errors');

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

global._base = path.join(__dirname, "/");

const setUpDB = require('./services/setUpDatabase');
setUpDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(global._base, 'public')));

const routes = require('./routes');
app.use('/', routes);

// Handle 404
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error(`[ERR]: ${err.message}`);
    console.error(`       ${err.stack}`);

    res.status(status);
    res.json({ status, message: err.message});
});

app.listen(port, () => {
    console.log('API listening on port ' + port);
});
