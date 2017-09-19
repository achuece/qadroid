var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res) {
    res.render("home", {
        styleSheet: "home",
        title: "Qadroid"
    });
});

router.get("/register", function(req, res) {
    res.render("register", {
        styleSheet: "signup",
        title: "Qadroid - Signup"
    });
})

router.post("/register", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.password_confirmation;
    var avatar = req.body.avatar;

    if (password !== confirmPassword) {
        res.send("Invalid password"); //TODO: Add a flash card
    }

    var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        avatar: avatar
    });

    User.register(newUser, password, function(err, registeredUser) {
        if (err) {
            console.log(err);
            return res.render("register", {
                styleSheet: "signup",
                title: "Qadroid - Signup"
            });
        }
        else {
            console.log("User registered!", registeredUser);
            passport.authenticate("local")(req, res, function() {
                res.redirect("/");
            });
        }
    });
})

router.get("/login", function(req, res) {
    res.render("login", {
        styleSheet: "login",
        title: "Qadroid - Login"
    });
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            req.flash("error", "Something went wrong. Please try again.");
            return next(err); 
        }
        if (!user) { 
            req.flash("error", "You have entered invalid username / password. Please try again.");
            return res.redirect('/login'); 
        }
        req.logIn(user, function(err) {
            if (err) { 
                req.flash("error", "Something went wrong. Please try again.");
                return next(err); 
            }
            req.flash("success", "Welcome back " + req.user.firstName + " " + req.user.lastName + "!");
            return res.redirect("/");
        });
    })(req, res, next);
});

router.post("/login",
    passport.authenticate(
        "local", {
            successRedirect: "/",
            successFlash: "Welcome back!",
            failureRedirect: "login",
            failureFlash: "Invalid username or password."
        }),
    function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/");
});

module.exports = router;
