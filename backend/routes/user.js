const express = require('express');
const router = express.Router();
const { signup, login, changePassword , autoLogin} = require('../controller/User');
const { verifyOtp , sendOTP } = require('../controller/User'); 

router.post('/verify-otp', verifyOtp);

router.post('/sendotp', sendOTP);

router.get('/autoLogin', autoLogin);




router.post('/signup', signup);


router.post('/login', login);

router.post('/change-password', changePassword);

module.exports = router;
