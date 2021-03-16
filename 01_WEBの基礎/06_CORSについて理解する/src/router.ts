import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "success!!" });
  } catch {
    res.status(400).json({ message: "Sorry, something went wrong." });
  }
});

export default router;
