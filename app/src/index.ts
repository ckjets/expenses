import express from 'express';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next) =>
  res.send("hello world!!!!")
);

app.use('/', router);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
