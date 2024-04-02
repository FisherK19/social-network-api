// Import the required models from the models directory
const { Thought, User } = require("../models");

// Define the userController object to encapsulate user-related operations
const userController = {
    // Retrieve all users from the database
    getAllUsers(req, res) {
        User.find()
            .then(users => res.json(users)) // Send the found users as a JSON response
            .catch(err => res.status(500).json(err)); // Handle any errors
    },

    // Create a new user with the request body data
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData)) // Return the created user data as JSON
            .catch(err => res.status(500).json(err)); // Handle any errors
    },

    // Update a user's information based on the user ID provided in the request parameters
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, // Find a user by the provided ID
            { $set: req.body }, // Update the user with the request body data
            { runValidators: true, new: true } // Options: run schema validators and return the updated document
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' }); // User not found
            } else {
                res.json(user); // Return the updated user data
            }
        })
        .catch(err => res.status(500).json(err)); // Handle any errors
    },

    // Delete a user and their associated thoughts based on the user ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' }); // User not found
                }
                // If the user is found, delete their associated thoughts
                return Thought.deleteMany({ _id: { $in: user.thoughts } });
            })
            .then(() => res.json({ message: 'User and associated thoughts deleted!' })) // Confirm deletion
            .catch(err => res.status(500).json(err)); // Handle any errors
    },

    // Retrieve a single user by their ID
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID' }); // User not found
                } else {
                    res.json(user); // Return the found user data
                }
            })
            .catch(err => res.status(500).json(err)); // Handle any errors
    },

    // Add a friend to the user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } }, // Use $addToSet to prevent duplicate friend IDs
            { new: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' }); // User not found
            } else {
                res.json(user); // Return the updated user data
            }
        })
        .catch(err => {
            console.error('Error when adding friend:', err);
            res.status(500).json(err); // Handle any errors
        });
    },
      
    // Remove a friend from the user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }, // Use $pull to remove the friend ID from the array
            { new: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' }); // User not found
            } else {
                res.json(user); // Return the updated user data
            }
        })
        .catch(err => {
            console.error('Error when removing friend:', err);
            res.status(500).json(err); // Handle any errors
        });
    }
};

// Export the userController to be used in other parts of the application
module.exports = userController;
