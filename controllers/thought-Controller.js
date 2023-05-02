// require thought models
const { Thought } = require('../models');


// Thought controller


// create thoughts and push the thought to user's thoughts array
const thoughtController = {
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
    }
};


// get all thoughts and sort by newest thought
const getAllThoughts = (req, res) => {
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
}


// get thought by id
const getThoughtById = ({ params }, res) => {
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
}
