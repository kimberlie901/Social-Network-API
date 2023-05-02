// require mongoose 
const { schema, model, types} = require("mongoose");

// import date format
const dateFormat = require("../utils/dateFormat");  

// MAKE SURE TO GO BACK AND ADD THE DATE FORMAT TO UTILS FOLDER


// reactions schema 
const reactionSchema = new schema({
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
        type: schema.Types.ObjectId,
        default: () => new schema.Types.ObjectId()
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
        get: createdAtVal => dateFormat(createdAtVal)
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


// thought schema
const thoughtSchema = new schema({
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
        get: createdAtVal => dateFormat(createdAtVal)
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


thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
}   );


// create the Thought model using the thoughtSchema
const Thought = model("Thought", thoughtSchema);


// export the Thought model
module.exports = Thought;
