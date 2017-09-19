var mongoose = require("mongoose");

var replySchema = mongoose.Schema({
    text: String,
    avatar: String,
    date: { type: Date, default: Date.now },
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        name: String
    },
    commentId: String
});

module.exports = mongoose.model("Reply", replySchema);