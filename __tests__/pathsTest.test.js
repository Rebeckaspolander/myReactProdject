import request from "supertest";
import express from "express";
import {loginPath, userPath} from "../paths.js";
import bodyParser from "body-parser";

//create an new app, it useing express.
// and i ´´ jusing the login path that we have defines in our app.
const app = express();
app.use(bodyParser.json());
app.use("/login", loginPath);

describe("test suit fro paths", () =>{
    it("fails to login with unknown user", async () => {
        const response = await request(app)
            .post("/login")
            .send({username: "tester", password: "testPassword"});

        expect(response.status).toEqual(401);
    });
});