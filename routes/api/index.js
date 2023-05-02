// require express router
const router = require('express').Router();


// require user routes and thought routes
const userRoutes = require('./user_routes');
const thoughtRoutes = require('./thought-routes');

// add prefix or users and thoughts to created routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export module router
module.exports = router;