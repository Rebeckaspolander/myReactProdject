import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {loginMiddleware, loginPath, logoutPath, userPath} from "./paths.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:false
}));

// process.env.COOKIE_SECRET, using .env file where  we define COOKIE_SECRET
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(loginMiddleware);
app.use("/login", loginPath);
app.use("/users", userPath);
app.use("/logout", logoutPath)
//app.use("/user/{id}", userPath);


app.use(express.static("public/"));

const server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log(`I have started! On: http://localhost:${server.address().port}`)
});