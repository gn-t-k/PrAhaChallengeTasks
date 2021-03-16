import express from "express";
import cacheControl from "express-cache-controller";

const image = express();
const imageServer = express.static("images");
image.use(cacheControl({ noStore: true }));
image.use(imageServer);
image.listen(8081);

const cachedImage = express();
const cachedImageServer = express.static("cached-images");
cachedImage.use(cacheControl({ maxAge: 60 * 60 * 24, private: true }));
cachedImage.use(cachedImageServer);
cachedImage.listen(8082);
