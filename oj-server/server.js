const express = require('express');
const app = express();
const mongoose = require('mongoose');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

const db_username = 'diwang_COJDB';
const db_password = '88888888';
mongoose.connect(`mongodb://${db_username}:${db_password}@ds129031.mlab.com:29031/coj`);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.use('/', indexRouter);
app.use('api/v1', restRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});