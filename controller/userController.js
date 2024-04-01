const req = require("express/lib/request");
const { Thought, User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));

    },
    // create user
    createUser(req, res) {
        User.create(req.body).then((dbUserData) => res.json(dbUserData)).catch((err) => res.status(500).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((user) => {
            !user ? res.status(404).json({ message: 'No user' }) : res.json(user);

        }).catch((err) => res.status(500).json(err));


    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
        })).then(() => res.json({ message: 'User and associated apps deleted!' })).catch((err) => res.status(500).json(err));
    },
    // getUserById,
    getUserById(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user)).catch((err) => res.status(500).json(err));
    },
    // addFriend
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId }, // Ensure this parameter name matches the route
          { $addToSet: { friends: req.body.friendId } }, // Assuming `friendId` is what you send in the request body
          { new: true }
        )
        .then(user => {
          if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
          } else {
            res.json(user);
          }
        })
        .catch(err => {
          console.error('Error when adding friend:', err);
          res.status(500).json(err);
        });
      },
      
    // removeFriend
    removeFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $pull: {
                friends: req.params.friendsId
            }
        }, {
            runValidators: true,
            new: true
        }).then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID :(' }) : res.json(user)).catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;