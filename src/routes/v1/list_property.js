
const express = require('express');
let router = express.Router();

const property = require('../../controllers/list_property');

router.post('/', property.ListProperty);

router.use('*', (req, res) => {
    res.json({
        statusCode: 404,
        status: "success",
        message: 'invalid request'
    })
})

module.exports = router;