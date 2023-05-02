// require mongoose
const { Schema, model } = require('mongoose');


// create user schema
const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: "A username is required",
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: "An email is required",
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address"],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() { 
    return this.friends.length;
});


// create the User model using the UserSchema
const User = model('User', UserSchema);


// export the User model
module.exports = User;