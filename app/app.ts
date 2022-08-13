import {
  // main APIs
  Client,
  middleware,

  // exceptions
  JSONParseError,
  SignatureValidationFailed,

  // types
  TemplateMessage,
  WebhookEvent,
} from "@line/bot-sdk"
import { Request, Response } from 'express'
// import { config } from './src/config/webhook'
require('dotenv').config()
// const log4js = require("log4js")
const https = require("https")


const config = {
  channelAccessToken: "KhNfVxAbQPo3JceU5mF4iw6bYbffkSyLrH7JYUHTuYZPm1wrfW77uv4zQULjt/8TK1NSllI0VqklfFDiOwbGmN5Tsyh37aczBc80y567cdMOOVnpPLw4gRje20uWJwj9G87qk5yz9qZwJHypRNmxfgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "372beb645ad962210c72f4348646e488"
}

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// ルーティング
var indexRouter = require(`${__dirname}/src/routes/index.ts`)

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// Express がプロジェクトルートの /public ディレクトリにあるすべての静的ファイルを処理するようにするため追加
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// /** line webhook */
/** @see https://line.github.io/line-bot-sdk-nodejs/guide/webhook.html#error-handling */
app.use(middleware(config))

/**
 * @see https://line.github.io/line-bot-sdk-nodejs/getting-started/basic-usage.html#synopsis
 */
app.post('/webhook', (req: Request, res: Response) => {
  console.log('===webhook===')
  console.log('===req===',req)
  console.log('===res===',res)
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
  res.json(req.body.events) // req.body will be webhook event object
})

const client = new Client(config)
const handleEvent = (event: WebhookEvent) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  })
}


// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: any) => {
  next(createError(404))
})

// error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log('=========err!!!============')
  console.log(err)
  res.render('error')
})

module.exports = app