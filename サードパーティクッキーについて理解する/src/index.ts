import express from "express";
import staticPage from "./staticPage";
import thirdPartyCookie from "./thirdPartyCookie";

const app = express();
app.use(staticPage);
app.listen(8080);

const cookieServer = express();
cookieServer.use(thirdPartyCookie);
cookieServer.listen(8081);

export default app;
