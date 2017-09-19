var express = require("express");
var router  = express.Router();
var Discussion = require("../models/discussion");
var middleware = require("../middleware");

//INDEX - show all discussions
router.get("/", function(req, res) {
    Discussion.find({}, function(err, allDiscussions) {
        if (err) {
            res.send("Unable to fetch all the discussions. Please try again later.");
        }
        else {
            res.render("discussions", 
                        {
                            styleSheet: "discussion/discussions",
                            title: "Qadroid - Discussions",
                            discussions: allDiscussions
                            
                        });
        }
    }); //TODO: Add next page / Ask to click more to load the remaining discussions
});

//CREATE - add new discussion to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to discussions array
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
            id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName
        };
    var newDiscussion = {title: title, image: image, description: desc, author: author};
    
    // Create a new discussion and save to DB
    Discussion.create(newDiscussion, function(err, discussionCreated){
        if(err){
            res.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
        } else {
            res.flash("success", "Successfully deleted the discussion!");
            res.redirect("back");
        }
    });
});

//NEW - show form to create new discussion
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("discussions/new", 
              {
                styleSheet: "discussion/new",
                title: "Qadroid - New Discussion"
              }); 
});

// SHOW - shows more info about one discussion
router.get("/:id", function(req, res){
    //find the discussion with provided ID
    Discussion.findById(req.params.id).populate("comments").exec(function(err, foundDiscussion){
        if(err){
            res.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
        } else {
            if (!foundDiscussion) {
                res.flash("error", "Discussion not found.");
                res.redirect("back");
            }
            
            //render show template with that discussion
            res.render("discussions/show", {
                            styleSheet: "discussion/discussions",
                            title: foundDiscussion.title, 
                            discussion: foundDiscussion});
        }
    });
});

// Edit Discussion
router.get("/:id/edit", function(req, res) {
    Discussion.findById(req.params.id, function(err, discussionFound) {
        if (err) {
            res.redirect("/discussions");
        } else {
            if (!discussionFound) {
                res.flash("error", "Discussion not found.");
                res.redirect("back");
            }
            
            res.render("discussions/edit",
                {
                    styleSheet: "discussion/edit", 
                    title: "Edit Discussion",
                    discussion: discussionFound
                });
        }
    });
});

// Update Discussion
router.put("/:id", middleware.checkDiscussionOwnership, function(req, res) {
    Discussion.findById(req.params.id, function(err, discussionFound) {
        if (err) {
            res.redirect("/discussions");
        } else {
            Discussion.findByIdAndUpdate(
                req.params.id, 
                req.params.discussion,
                function(err, updatedDiscussion) {
                   if (err) {
                        res.flash("error", "Something went wrong. Please try again.");
                        res.redirect("discussions/" + req.params.id)
                   } else {
                        res.flash("success", "Successfully updated the discussion!");
                        res.redirect("discussions/" + req.params.id)
                   }
                });
        }
    });
});

// Delete Discussion
router.delete("/:id", middleware.checkDiscussionOwnership, function(req, res) {
    Discussion.findByIdAndRemove(
        req.params.id, 
        req.params.discussion,
        function(err, updatedDiscussion) {
            if (err) {
                res.flash("error", "Something went wrong. Please try again.");
                res.redirect("discussions/" + req.params.id)
           } else {
                res.flash("success", "Successfully deleted the discussion!");
                res.redirect("discussions/")
           }
        });
});

module.exports = router;

