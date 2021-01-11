import express from "express";

const thirdPartyCookie = express.static("thirdPartyCookie", {
  setHeaders: (res) => {
    res.cookie("thirdPartyCookie", "fuga", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
  },
});

export default thirdPartyCookie;
