import request from "supertest";
import express, {response} from "express";
import {loginMiddleware, loginPath, userPath} from "../paths.js";
import bodyParser from "body-parser";
import cookieParser, {signedCookies} from "cookie-parser";

//create an new app, it useing express.
// and i ´´ jusing the login path that we have defines in our app.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test secret"));

app.use(loginMiddleware);
app.use("/login", loginPath);
app.use("/users", userPath);

describe("test suit for paths", () =>{

    beforeAll(async () => {
        await request(app)
            .post("/users")
            .send({username: "admin", password: "secret", fullname: "Testsson"})
    });

    it("fails to login with unknown user", async () => {
        const response = await request(app)
            .post("/login")
            .send({username: "tester", password: "testPassword"});

        expect(response.status).toEqual(401);
    });

    it("Login known user", async () => {
        const agent = request.agent(app);

        await agent
            .post("/login")
            .send({username: "admin", password: "secret"});
            //.expect(200);
        const loggedUser = await agent.get("/login");

        expect(loggedUser.body).toMatchObject({username: "admin", password: "secret", fullname: "Testsson"})
    })

    it("requires all user properties", async () => {
        await request(app)
            .post("/users")
            .send({username: "username", password: "password"})
            .expect(400);
        await request(app)
            .post("/users")
            .send({username: "username", fullName: "full name"})
            .expect(400);
        await request(app)
            .post("/users")
            .send({fullName: "full name", password: "password"})
            .expect(400);
    });

    it("requires login to view users", async () => {
        await request(app)
            .get("/users")
            .expect(403);
    });

  /*  it("logging out", async () =>{
        const request1 = request(app)
            await request1
                .post("/logout")
                .send({username: null, password: null})
                expect();
    });*/


});