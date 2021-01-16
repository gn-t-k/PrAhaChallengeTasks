import express, { Request, Response } from "express";
import { isError } from "./types";

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
      throw new Error("Content-Type: application/json is only allowed");
    }
  } catch (error: unknown) {
    const errorMessage = ((_error) =>
      isError(_error) ? _error.message : "Sorry, something went wrong.")(error);

    res.status(400).json({ message: errorMessage });
  }
});

export default router;
