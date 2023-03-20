
const seachpropery = require('../database/search_properties');

const pincode = (req, res) => {
    let body = req.body;
    if (Object.keys(body).length > 0) {

        if (body.pincode == "" || body.pincode.length !== 6) {
            res.status(404).json({
                statusCode: 404,
                status: "success",
                message: "Request Parameter Pincode Is Invalid",
            })
        } else {
            seachpropery.pincode(body, res);
        };

    } else {
        res.status(404).json({
            statusCode: 404,
            status: "success",
            message: "Request Parameter Are Empity In Body",

        })
    }

}

const properyById = (req, res) => {
    let body = req.body;
    if (Object.keys(body).length > 0) {

        if (body.propertyId == "") {
            res.status(404).json({
                statusCode: 404,
                status: "success",
                message: "Request Parameter Pincode Is Invalid",
            })
        } else {
            seachpropery.properyById(body, res);
           
        };

    } else {
        res.status(404).json({
            statusCode: 404,
            status: "success",
            message: "Request Parameter Are Empity In Body",

        })
    }

}

module.exports = { pincode, properyById };