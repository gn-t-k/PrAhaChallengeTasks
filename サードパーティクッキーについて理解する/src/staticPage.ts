import express from "express";

const staticPage = express.static("public", {
  setHeaders: (res) => {
    res.cookie("firstPartyCookie", "hoge", {
      httpOnly: true,
    });
  },
});

export default staticPage;
