import express, { Router } from 'express';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next) =>
// renderで views配下を読み込んでる
  // res.render('index', { title: 'Express' })
  res.send("hello world!!!!")
);

app.use('/', router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});


// export default app;

// import express from "express";
// import * as bodyParser from "body-parser";

// const app = express();
// const router = express.Router();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// router.get(
//   "/",
//   async (req: express.Request, res: express.Response): Promise<void> => {
//     res.send("hello worldaaaaaa");
//   }
// );

// app.use("/", router);

// app.listen(3000, () => {
//   console.log("listening on port 3000");
// });

// export default app;