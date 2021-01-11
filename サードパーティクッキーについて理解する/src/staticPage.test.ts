import express from "express";
import supertest from "supertest";
import cookieParser from "cookie-parser";
import staticPage from "./staticPage";

describe("8080", () => {
  it("/にアクセスするとhtmlが返ってくる", async () => {
    const app = express();
    app.use(staticPage);
    app.use(cookieParser());

    const request = supertest(app);
    const response = await request.get("/");

    expect(response.type).toEqual("text/html");
  });

  it("/にアクセスすると、cookie=hogeのcookieが送信される", async () => {
    const app = express();
    app.use(staticPage);
    app.use(cookieParser());

    const request = supertest(app);
    const response = await request.get("/");

    expect(response.headers).toHaveProperty("set-cookie", [
      "cookie=hoge; Path=/",
    ]);
  });
});
