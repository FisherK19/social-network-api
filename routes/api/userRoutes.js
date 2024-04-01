const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controller/userController");

// Set up GET all and POST at /api/users
router.route("/")
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:userId
router.route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Add a friend using POST at /api/users/:userId/friends
router.route("/:userId/friends")
  .post(addFriend);

// Remove a friend using DELETE at /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
  .delete(removeFriend);

module.exports = router;
