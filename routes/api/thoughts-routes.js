// require express router
const router = require("express").Router();

// require the thought controller
const { 
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-Controller");


// set up GET all thoughts and POST at /api/thoughts

router.route("/").get(getAllThoughts).post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id

router.route("/:thoughtId").get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);


// set up POST and DELETE at /api/thoughts/:thoughtId/reactions

router.route("/:thoughtId/reactions").post(addReaction);


router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);


// export module router
module.exports = router;