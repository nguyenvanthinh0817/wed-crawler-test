/** @format */

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const config = require('../config');
const exphbs = require('express-handlebars');

const indexRouter = require('./routers/index');

mongoose.connect(config.database, {
  /// kết nối database
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('conect success');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);

app.listen(3000);
