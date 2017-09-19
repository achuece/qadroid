var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Discussion = require("./models/discussion"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    discussionRoutes = require("./routes/discussions"),
    indexRoutes      = require("./routes/index")
    
seedDB();

mongoose.connect(process.env.Database_Url, {
  useMongoClient: true,
});

// Passport Configuration
app.use(require("express-session")({
    secret: "Qadroid1234",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("resources"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// This will be the middleware that adds the user details to the template passed to each ejs file 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next(); // Proceed to the route that is supposed to be shown
});

app.use("/", indexRoutes);
app.use("/discussions", discussionRoutes);
app.use("/discussions/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Qadroid Server has started!!!");
});
