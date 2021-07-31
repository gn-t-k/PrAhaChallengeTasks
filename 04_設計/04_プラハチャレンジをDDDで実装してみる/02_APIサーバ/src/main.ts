/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import express from "express";
import { RouteInitializer } from "config/initializer/route-initializer";

try {
  const PORT = 3000;

  const app = express();
  const router = express.Router();
  const context = {
    prisma: new PrismaClient(),
  };

  new RouteInitializer(router, context).execute();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${PORT}`);
  });
} catch (error) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  console.error(message);
}
