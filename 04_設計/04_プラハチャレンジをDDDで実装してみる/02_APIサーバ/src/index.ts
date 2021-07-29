/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import express from "express";
import { MemberRouteFactory } from "presentation/implementation/express/service/member-route-factory";

try {
  const PORT = 3000;

  const app = express();
  const router = express.Router();
  const context = {
    prisma: new PrismaClient(),
  };

  const memberRoute = new MemberRouteFactory(router, context).execute();
  memberRoute.register();

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
