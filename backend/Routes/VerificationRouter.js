const { fetchToken } = require('../Controllers/VerificationController');

const router = require('express').Router();

//fetch jwtToken
router.get('/', fetchToken)



module.exports = router;