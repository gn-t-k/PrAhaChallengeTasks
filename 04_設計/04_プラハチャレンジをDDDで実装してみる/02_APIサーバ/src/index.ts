/* eslint-disable no-console */
import express from "express";

try {
  const PORT = 3000;

  const app = express();
  const router = express.Router();
} catch (error) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  console.error(message);
}
