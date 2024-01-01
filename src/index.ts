import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
require("./database/mongodb/connection");

const app: Express = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", router());


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});