var express = require("express");
var router  = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Reply = require("../models/reply");
var middleware = require("../middleware");

router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup comment using ID
   Comment.findById(req.params.comment_id, function(err, comment){
       if(err){
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
       } else {
        var reply = req.body.reply;
        reply.commentId = req.params.comment_id;
        reply.author = {
            id: req.user._id,
            name: req.user.firstName + " " + req.user.lastName
        };
        
        Reply.create(reply, function(err, replyCreated){
           if(err){
               req.flash("error", "Something went wrong. Please try again.");
               res.redirect("back");
           } else {
               comment.replies.push(replyCreated);
               comment.save();
               req.flash("success", "Your reply was added successfully!");
               res.redirect("back");
           }
        });
       }
   });
});

// Reply update
router.put("/:comment_id", middleware.checkReplyOwnership, function(req, res){
   Reply.findByIdAndUpdate(req.params.reply_id, req.body.reply, function(err, updatedReply){
      if(err){
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("back");
      } else {
            req.flash("success", "Nice! Your reply has been updated!");
            res.redirect("/discussions/" + req.params.id);
      }
   });
});

module.exports = router;