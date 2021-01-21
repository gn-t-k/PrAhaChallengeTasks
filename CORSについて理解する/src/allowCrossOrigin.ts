import { Request, Response, NextFunction } from "express";

const allowCrossDomain = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default allowCrossDomain;
