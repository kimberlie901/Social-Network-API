// require mongoose 
const { schema, model, types} = require("mongoose");

// reactions schema 
const reactionsSchema = new schema({ 
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: types.ObjectId,
        default: () => new types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        // 280 character maximum
        maxlength: 280 
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // set default value to current timestamp
        default: Date.now,
        // use getter method to format timestamp on query