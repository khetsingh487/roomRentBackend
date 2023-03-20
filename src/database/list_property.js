const connection = require('./connetion');

const ListProperty = (data, res) => {


    let basicDetails = [
        data.landloard_id,
        data.property_type,
        data.plot_number,
        data.street,
        data.landmark,
        data.city,
        data.latitude,
        data.longtitude,
        data.pincode,
        data.state,
        data.price
    ];

    let images = data.image;
    let facilities = data.facilities;

    connection.query("INSERT INTO `list_property`(`landloard_id`, `property_type`, `plot_number`, `street`, `landmark`, `city`, `latitude`, `longtitude`, `pincode`, `state`, `price`) VALUES (?)", [basicDetails], function (error, results, fields) {

        if (error) {
            res.status(500).json({
                statusCode: 500,
                status: "failed",
                message: 'Internal server error please try again something worng!',
            })

        } else if (results.affectedRows > 0) {
            let lastIdOfProperyList = results.insertId;

            let facility = [lastIdOfProperyList, facilities.no_room, facilities.kitchen, facilities.bath, facilities.toilate, facilities.fan, facilities.blub];

            connection.query("INSERT INTO `facilities`(`property_id`, `no_room`, `kitchen`, `bath`, `toilate`, `fan`, `blub`) VALUES (?)", [facility], function (error, results, fields) {
                if (error) {
                    res.status(500).json({
                        statusCode: 500,
                        status: "failed",
                        message: 'Internal server error please try again something worng!',
                    })

                } else if (results.affectedRows > 0) {
                    let lastIdOfFacilites = results.insertId;

                    images.map((val, index) => {
                        let img = [lastIdOfProperyList, val];

                        connection.query("INSERT INTO `property_image`(`property_id`, `image`) VALUES (?)", [img], function (error, results, fields) {

                            if (error) {
                                res.status(500).json({
                                    statusCode: 500,
                                    status: "failed",
                                    message: 'Internal server error please try again something worng!',
                                })

                            }

                        });
                    })
                    res.status(201).json({
                        statusCode: 201,
                        status: "success",
                        message: 'Poperty is added',
                    })

                }
            })
        }

    })

}

module.exports = { ListProperty };

