import express from "express";
import allowCrossDomain from "./allowCrossOrigin";
import router from "./router";
import staticPageServer from "./staticPageServer";

const app = express();
app.use(allowCrossDomain);
app.use(router);
app.listen(8080);

const staticPage = express();
staticPage.use(staticPageServer);
staticPage.listen(8081);
