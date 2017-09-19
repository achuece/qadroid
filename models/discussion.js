var mongoose = require("mongoose");

var discussionSchema = mongoose.Schema({
   title: String,
   description: String,
   image: String,
   author: {
      id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
      },
      name: String
   },
   comments: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Comment"
   }]
});

module.exports = mongoose.model("Discussion", discussionSchema);