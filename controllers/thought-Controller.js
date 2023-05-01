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
            .then(thoughtID => {
                if (!thoughtID) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(thoughtID);
            })
            .catch(err => res.json(err));
    }
};
