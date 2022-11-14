import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:false
    }));
app.use(cookieParser());
//When you go to this path(endpoint) you will get a request and response.
//This sends just plain text
// app.get("/login", (req, res)=>{
//         res.json("login endpoint");
// })

//You can change the end point to "what ever you want" ("/your end point" endpoint).
app.get("/login",(req, res)=>{
        /* res.json({
                username: "admin"
        });*/
        //Instead of sending just username... you will get the username and fullname.
        const user =USERS.find(u => u.username === req.cookies.username);

        const{username, fullname} = user;
        res.json({username, fullname});

});

const USERS = [
        {
                username: "admin",
                password: "secret",
                fullname: "Testsson"
        }
]

//The browser calls the get on default.
app.post("/login", (req, res)=>{
        // POST send data client -> server
        // Somewhere here - I know that there is a request with info in the body.

        //const body = req.body;
        console.log("getting this far")
        const { username, password } = req.body;

        const user = USERS.find(u => u.username === username);

        //Find me the user with the matching/same username and get me their password,
        //if their password is the same as the password that I received.
        if (user && user.password === password){
                res.cookie("username", username);
                res.sendStatus(200)
                    .redirect("/");
        }else{
                res.sendStatus(401)
                    .redirect("/");
        }

});

app.use(express.static("public"));

const server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log("I have started on: http://localhost:" + server.address().port)}
)