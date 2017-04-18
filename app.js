const express = require("express"),
      app = express();
      
app.set("view engine", "ejs");

app.get("/", (req, res) => {
   res.render("home"); 
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secret", (req, res) => {
   res.render("secret"); 
});
      
app.get("*", (req, res) => {
    res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Server is listening");  
});