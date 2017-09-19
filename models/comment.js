var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    media: String,
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        name: String
    },
    descriptionId: String
});

module.exports = mongoose.model("Comment", commentSchema);