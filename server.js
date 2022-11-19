import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:false
    }));

// process.env.COOKIE_SECRET, using .env file where  we define COOKIE_SECRET
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(loginMiddleware);

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


        const cookieUsername = req.signedCookies.username
        if (!cookieUsername){
                return res.sendStatus(401);
        }
        const user = USERS.find(u => u.username === cookieUsername);
        //Instead of sending just username... you will get the username and fullname.
        //const user =USERS.find(u => u.username === req.cookies.username);

        const{username, fullname} = user;
        res.json({username, fullname});

});

const USERS = [
        {
                username: "admin",
                password: "secret",
                fullname: "Testsson"
        }
];

//For logging in..
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
                res.cookie("username", username, {signed: true});
                res.sendStatus(200)
                    .redirect("/");
        }else{
                res.sendStatus(401)
                    .redirect("/");
        }
});

app.get("/users", (req, res)=>{
        // if the user not exist send a 403
        // "else" show all the USERS.
        console.log(res.user);
        if(!res.user){
                return res.sendStatus(403);
        }
        res.json(USERS);
});

// For register user
//usernamen will come from the request
app.post("/users", (req, res)=>{
        const {username, password, fullname} = req.body;
        if(!username || !password || !fullname){
                return res.sendStatus(400);
        }
        USERS.push({username: username, password: password, fullname: fullname});

        //after user has push the register button teh browser will go back to the root.
        res.redirect("/");

})

app.use(express.static("public"));

// You cant edit a request but you can edit a response.
function loginMiddleware(req, res, next){
        res.user = USERS.find(u => u.username === req.signedCookies?.username);
        //next don´t send the req back to the client, continue..
        next()
}


const server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log(`I have started! On: http://localhost:${server.address().port}`)
});