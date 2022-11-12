import express from "express";

const app = express();
//When you go to this path(endpoint) you will get a request and response.
//This sends just plain text
// app.get("/login", (req, res)=>{
//         res.json("login endpoint");
// })

//You can change the end point to "what ever you want" ("/your end point" endpoint).
app.get("/login",(req, res)=>{
        res.json({
                username: "admin"
        });
})

const server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log("I have started on: http://localhost:" + server.address().port)}
)