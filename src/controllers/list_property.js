const addProperty = require('../database/list_property');

const ListProperty = (req, res) => {

    let body = req.body;
    if (body.landloard_id !== '' && body.property_type !== '' && body.plot_number !== '' && body.latitude !== '' && body.longtitude !== '' && body.image.length > 0 && body.facilities.no_room !== '') {
        // res.send('name and email are empty');
        addProperty.ListProperty(body, res);

    } else {
        res.status(404).json({
            statusCode: 404,
            status: "success",
            message: 'Request Parameters Are Empity'
        });
    }

}

module.exports = { ListProperty };