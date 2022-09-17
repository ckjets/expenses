import { middleware } from "@line/bot-sdk";
require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ルーティング
var indexRouter = require(`${__dirname}/src/routes/index.ts`);

var app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN ||  "",
  channelSecret: process.env.CHANNEL_SECRET || ""
};

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Express がプロジェクトルートの /public ディレクトリにあるすべての静的ファイルを処理するようにするため追加

app.use('/', indexRouter);


// https://line.github.io/line-bot-sdk-nodejs/api-reference/middleware.html#usage
// globally
// app.use(middleware(config))

// or directly with handler
app.post('/webhook', middleware(config), (req: any, res: any) => {
  req.body.events // webhook event objects
  req.body.destination // user ID of the bot (optional)
})

// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

