const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      app                   = express();
      
const User = require("./models/user");
      
mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
    secret: "The dog that barks at me is the best dog ever",
    resave: false,
    saveUninitialized: false
}));
      
app.set("view engine", "ejs");
app.use(passport.initialize()); //this line is needed anytime we use passport
app.use(passport.session());   //this line is needed anytime we use passport


//PATHS
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