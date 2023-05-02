// require thought models
const { Thought } = require('../models');


// Thought controller
const thoughtController = {

    // create thoughts and push the thought to user's thoughts array
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    // return updated user
                    { new: true }
                );
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },


    // get all thoughts and sort by newest thought
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    // update thought by id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },


    // delete thought by id
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },


    // delete reaction from thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            // return updated thought
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    }
};


// export thought controller
module.exports = thoughtController;