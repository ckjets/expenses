import express, { Request, Response } from 'express';
import * as line from '@line/bot-sdk';

var router = express.Router();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

// console.log("config!!", config) // 2022-09-17: 値とれてる

router.get('/', function(req: Request, res: Response, next) {
    res.send('hello world!!!')
});

router.get('/test', function(req: Request, res: Response, next) {
    res.send('test')
});

// 2022-09-17: app.tsで定義してみたのでコメントアウト
// router.post('/webhook', line.middleware(config), (req: Request, res: Response) => {
//     console.log("========================")
//     console.log("config", config)
//     Promise
//       .all(req.body.events.map(handleEvent))
//       .then((result) => res.json(result));
//   });
  
//   const client = new line.Client(config);
//   function handleEvent(event: any) {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//       return Promise.resolve(null);
//     }
  
//     return client.replyMessage(event.replyToken, {
//       type: 'text',
//       text: event.message.text
//     });
//   }

  
module.exports = router;
