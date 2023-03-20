const express = require('express');
let router = express.Router();

let customerLoginController = require('../../controllers/customer_login_controllers');

router.post('/', customerLoginController.loginCustomer);


router.use('*', (req, res) => {
    res.send({
        "nice": 'invalid request'
    })
})

module.exports = router;