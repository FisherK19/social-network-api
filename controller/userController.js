const { Thought, User } = require("../models");

const userController = {
    getAllUsers(req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, // Make sure this matches the parameter in your route
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' });
            } else {
                res.json(user);
            }
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return Thought.deleteMany({ _id: { $in: user.thoughts } });
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
            .catch(err => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID' });
                } else {
                    res.json(user);
                }
            })
            .catch(err => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } },
            { new: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' });
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            console.error('Error when adding friend:', err);
            res.status(500).json(err);
        });
    },
      
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' });
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            console.error('Error when removing friend:', err);
            res.status(500).json(err);
        });
    }
};

module.exports = userController;
