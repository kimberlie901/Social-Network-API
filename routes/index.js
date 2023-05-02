// dependencies
const router = require('express').Router();


// import api routes
const apiRoutes = require('./api');


// api to all routes in /api from api folder    
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 There is an Error!</h1>');
});


// export router
module.exports = router;