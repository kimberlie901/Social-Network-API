// require express router
const router = require("express").Router();


// require the user controller
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-Controller");


// set up GET all users and POST at /api/users
router.route("/").get(getAllUsers).post(createUser);


// set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);


// set up POST and DELETE at /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);


// export module router
module.exports = router;
