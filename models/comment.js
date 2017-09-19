var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    media: String,
    date: { type: Date, default: Date.now },
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        name: String
    },
    replies: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Reply"
    }],
    discussionId: String
});

module.exports = mongoose.model("Comment", commentSchema);