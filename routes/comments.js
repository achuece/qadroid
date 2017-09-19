var express = require("express");
var router  = express.Router({mergeParams: true});
var Discussion = require("../models/discussion");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    // find discussion by id
    Discussion.findById(req.params.id, function(err, discussion){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", 
                        {   styleSheet: "login",
                            title: "Add new comment",
                            discussion: discussion
                        });
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup discussion using ID
   Discussion.findById(req.params.id, function(err, discussion){
       if(err){
            res.flash("error", "Something went wrong. Please try again.");
            res.redirect("/discussions");
       } else {
        var comment = req.body.comment;
        comment.descriptionId = req.params.id;
        comment.author = {
            id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName
        };
        Comment.create(comment, function(err, commentCreated){
           if(err){
               res.flash("error", "Something went wrong. Please try again.");
               res.redirect("/discussions/" + discussion._id);
           } else {
               discussion.comments.push(commentCreated);
               discussion.save();
               res.flash("success", "Great! You have added your comment!");
               res.redirect("/discussions/" + discussion._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
            res.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
      } else {
            res.render("comments/edit", {discussion_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
            res.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
      } else {
            res.flash("success", "Nice! Your comment has been updated!");
            res.redirect("/discussions/" + req.params.id );
      }
   });
});

module.exports = router;