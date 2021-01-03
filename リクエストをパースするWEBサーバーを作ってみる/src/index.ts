import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ text: "hello world" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    if (req.header("Content-Type") === "application/json") {
      res.status(201).json(req.body);
    } else {
      throw new Error("Content-Type: application/json is only allowed");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const port = process.env.PORT || 8080;

app.listen(port);
