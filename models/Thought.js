// require mongoose 
const { Schema, model, Types} = require("mongoose");

// import date format (either this or use Moment.js)
// const dateFormat = require("../utils/dateFormat");
const moment = require("moment");  

// MAKE SURE TO GO BACK AND ADD THE DATE FORMAT TO UTILS FOLDER
// also look into using Moment.js for date formatting


// reactions schema 
const reactionSchema = new Schema({
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
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
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


// thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        // set default value to current timestamp
        default: Date.now,
        // use getter method to format timestamp on query
        get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String,
        required: true
    },
    // use reactionSchema to validate data for a reaction, these are like the replies
    reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// total amount of reactions
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
}   );


// create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);


// export the Thought model
module.exports = Thought;
