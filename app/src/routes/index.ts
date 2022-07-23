import express, { Request, Response } from 'express';

var router = express.Router();

/* テスト用エンドポイント */
router.get('/', function(req: Request, res: Response, next) {
    res.send('hello world!!!')
});

module.exports = router;
