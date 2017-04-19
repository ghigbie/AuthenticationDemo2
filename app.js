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
app.use(bodyParser.urlencoded({extened: true}));
app.use(passport.initialize()); //this line is needed anytime we use passport
app.use(passport.session());   //this line is needed anytime we use passport

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========================
//ROUTES
//==========================
app.get("/", (req, res) => {
   res.render("home"); 
});

//show sign up form
app.get("/register", (req, res) => {
    res.render("register");
});

//handling user sign up
app.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

//LOGIN ROUTEs
app.get("/login", (req, res) => {
   res.render("login"); 
});

//LOGIN POST ROUTE - responsible for login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
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