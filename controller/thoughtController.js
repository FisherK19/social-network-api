const { Thought, User } = require("../models");
const { populate } = require("../models/User");

const thoughtController = {
// get all thoughts
getAllThoughts(req, res) {
    Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));

},
// get one thought by it's id
// create thought to a user
createThought(req, res) {
  let savedThought; // Variable to hold the created thought
  Thought.create(req.body)
  .then((dbThoughtData) => {
      savedThought = dbThoughtData; 
      // Make sure you're referencing the correct field name, userId not userID
      return User.findOneAndUpdate(
          {_id: req.body.userId}, 
          {$push:{ thoughts: dbThoughtData._id}},
          {new: true}
      )
  })
  .then(userData => {
      // Check if the user was found and updated
      if (userData) {
          // Now you can send back the thought data
          res.json(savedThought); 
      } else {
          // If the user was not found, send an appropriate response
          res.status(404).json({ message: 'User not found' });
      }
  })
  .catch((err) => {
      console.error('Error in createThought:', err);
      res.status(500).json(err);
  });
},

//update thought by it's id
updateThought(req, res) {
    Thought.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        runValidators: true,
        new: true
    }).then((thought) => {
        !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);

    }).catch((err) => res.status(500).json(err));


},

//   getThoughtById
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        // if no thought is found
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// delete a thought
deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.id})
    .then((thought) => {
        if(!thought){
            res.status(404).json({message: 'No thought with that ID'}) 


        }      
        
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$pull:{thoughts:thought._id}},
            {new:true}
 
        )
   }).then(() => res.json({message: 'User and associated apps deleted!'})).catch((err) => res.status(500).json(err));
},
// add Reaction
addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


//delete Reaction

deleteReaction(req, res) {
  console.log(req.params)

    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
      // { new: true }
    )
      .then((thought) =>
      // console.log("get the deleteReaction")
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },



}

module.exports = thoughtController;