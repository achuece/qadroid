var Comment = require("../../../models/comment");

function getComment(commentId) {
    Comment.find({ _id: commentId }, function(errorOnFindingComment, commentFound) {
            if (errorOnFindingComment) {
                console.log("Something went wrong while finding the comment. " + errorOnFindingComment);
            }
            else {
                return commentFound;
            }
    });
}