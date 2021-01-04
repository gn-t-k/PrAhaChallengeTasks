import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ text: "hello world" });
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    if (req.header("Content-Type") === "application/json") {
      res.status(201).json(req.body);
    } else {
      /**
       * TODO: `catch (error)`して、`error.message`でエラー返したいが、`error`の型がanyになってしまいeslintに怒られるのでエラーハンドリングの仕方知りたい
       */
      throw new Error("Content-Type: application/json is only allowed");
    }
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

export default router;
