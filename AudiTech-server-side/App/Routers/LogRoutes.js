//LogRoutes

const express = require ('express');
const LogController = require ('../Controllers/LogController')
const router = express.Router();

router.post('/logIn',LogController.login); // Log In
router.post('/logOut',LogController.logout); //Log out

module.exports = router;