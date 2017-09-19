var Discussion = require("../models/discussion");
var Comment = require("../models/comment");
var Reply = require("../models/reply");

// All the middleare goes here
var middlewareObj = {};

middlewareObj.checkDiscussionOwnership = function(req, res, next) {middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               if (!foundComment) {
                    req.flash("error", "Comment not found.");
                    return res.redirect("back");
                }
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


 if(req.isAuthenticated()){
        Discussion.findById(req.params.id, function(err, foundDiscussion){
           if(err){
               req.flash("error", "Discussion not found");
               res.redirect("back");
           }  else {
                if (!foundDiscussion) {
                    req.flash("error", "Discussion not found.");
                    return res.redirect("back");
                }
                
                // Does user own the discussion?
                if(foundDiscussion.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               if (!foundComment) {
                    req.flash("error", "Comment not found.");
                    return res.redirect("back");
                }
                // Does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkReplyOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Reply.findById(req.params.reply_id, function(err, foundReply){
           if(err){
               res.redirect("back");
           }  else {
               if (!foundReply) {
                    req.flash("error", "Reply not found.");
                    return res.redirect("back");
                }
                // Does user own the reply?
                if(foundReply.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;