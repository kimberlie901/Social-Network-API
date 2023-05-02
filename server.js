/** ACCEPTANCE CRITERIA
 * GIVEN a social network API
 * WHEN I enter the command to invoke the application
 * THEN my server is started and the Mongoose models are synced to the MongoDB database
 * WHEN I open API GET routes in Insomnia Core for users and thoughts
 * THEN the data for each of these routes is displayed in a formatted JSON
 * WHEN I test API POST, PUT, and DELETE routes in Insomnia 
 * THEN I am able to successfully create, update, and delete users and thoughts in my database
 * WHEN I test API POST and DELETE routes in Insomnia 
 * THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
 */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');


// variables for express server
const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));


// Connect to MongoDB/Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Log mongo queries
mongoose.set('debug', true);


// Start server
app.listen(PORT, () => console.log(`App listing on localhost:${PORT}`));