
const express = require('express');
const router = express.Router();
const seachproperty = require('../../controllers/search_properties')

router.post('/pincode', seachproperty.pincode);

router.post('/propertybyid', seachproperty.properyById);

// router.get('/', (req, res) => {
//     res.json({
//         status: "200",
//         message: "filter is working"
//     })
// })

router.use('*', (req, res) => {
    res.json({
        statusCode: 404,
        status: "success",
        message: 'invalid request'
    })
})

module.exports = router;