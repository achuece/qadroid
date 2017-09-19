var Discussion = require("./models/discussion"),
    Comment = require("./models/comment"),
    faker = require("faker");

var initialDiscussions = [{
    title: "Welcome to Qadroid",
    description: "This is a sample discussion thread to get you started.\n\n" + faker.lorem.paragraphs()
}];

function seedDB() {
    initialDiscussions.forEach(function(intialDiscussion) {
        Discussion.remove({ title: "Welcome to Qadroid" }, function(errorOnRemovingDiscussions, discussionsRemoved) {
            if (errorOnRemovingDiscussions) {
                console.log("Error while removing the initial discussions. " + errorOnRemovingDiscussions);
            }
            else {
                Discussion.find({ title: "Welcome to Qadroid" }, function(errorOnFindingDiscussions, discussionsFound) {
                    if (errorOnFindingDiscussions) {
                        console.log("Something went wrong while finding the inital discussion. " + errorOnFindingDiscussions);
                    }
                    else {
                        if (discussionsFound.length > 0) {
                            console.log("Initial discussion is already added to the database.");
                        }
                        else {
                            Discussion.create(intialDiscussion, function(errorDiscussionCreation, discussionCreated) {
                                if (errorDiscussionCreation) {
                                    console.log("There is an error while creating the initial discussion. " + errorDiscussionCreation);
                                }
                                else {
                                    Comment.create({
                                            text: "This is a sample comment added to the discussion.\n\n" + faker.lorem.sentences()
                                        },
                                        function(errorCommentCreation, commentCreated) {
                                            if (errorCommentCreation) {
                                                console.log("There is an error while creating the initial discussion. " + errorCommentCreation);
                                            }
                                            else {
                                                discussionCreated.comments.push(commentCreated);
                                                discussionCreated.save();
                                                console.log("Added this discussion:");
                                                console.log(discussionCreated);
                                            }
                                        });
                                }
                            });
                        }
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
