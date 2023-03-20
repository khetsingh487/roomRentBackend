
const connection = require('./connetion');


let property = (body) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM `list_property` WHERE `pincode` = ?", [body.pincode], function (error, result, fields) {
            if (error) {
                reject({
                    statusCode: 500,
                    status: "failed",
                    message: 'Internal server error please try again something worng!',
                })

            } else {
                // if (result.length > 0) {
                resolve(result);
                // } else {
                //     reject([]);
                // }
            }
        })

    })
}

let facility = (id) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM `facilities` WHERE `property_id` = ?", [id], function (error, facility, fields) {

            if (error) {
                reject({
                    statusCode: 500,
                    status: "failed",
                    message: 'Internal server error please try again something worng!',
                })
            } else {

                resolve(facility);

            }

        })

    })

}

let image = (id) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT `image` FROM `property_image` WHERE `property_id` = ?", [id], function (error, image, fields) {

            if (error) {
                reject({
                    statusCode: 500,
                    status: "failed",
                    message: 'Internal server error please try again something worng!',
                })
            } else {

                resolve(image);

            }

        })

    })
}

const pincode = async (body, res) => {

    try {

        let listProperty = await property(body);



        if (listProperty.length > 0) {

            let facilityImage = async () => {
                return new Promise((resolve, reject) => {

                    let length = listProperty.length;

                    listProperty.map(async (val, index) => {
                        let Listfacility = await facility(val.id);
                        listProperty[index].facilities = Listfacility

                        let listImage = await image(val.id);
                        listProperty[index].images = listImage;

                        if (length == index + 1) {
                            return resolve(true);
                        }

                    });

                })
            }

            let facilitiesImage = await facilityImage();


            if (facilitiesImage) {
                res.json({
                    statusCode: 200,
                    status: "success",
                    message: 'all results details',
                    result: listProperty
                })
            }
        } else {

            res.json({
                statusCode: 402,
                status: "success",
                message: 'Result Not Found',
            })
        }


    } catch (error) {
        res.json({
            statusCode: 500,
            status: "failed",
            message: 'Internal server error please try again something worng! catch',
        })
    }

}

let propertyId = (body) => {
    return new Promise((resolve, reject) => {

        connection.query("SELECT * FROM `list_property` WHERE `id` = ?", [body.propertyId], function (error, result, fields) {
            if (error) {
                reject({
                    statusCode: 500,
                    status: "failed",
                    message: 'Internal server error please try again something worng!',
                })

            } else {
                // if (result.length > 0) {
                resolve(result);
                // } else {
                //     reject([]);
                // }
            }
        })

    })
}

const properyById = async (body, res) => {

    try {

        let listProperty = await propertyId(body);

        if (listProperty.length > 0) {

            let Listfacility = await facility(listProperty[0].id);

            listProperty[0].facilities = Listfacility

            let listImage = await image(listProperty[0].id);
            listProperty[0].images = listImage;

            res.json({
                statusCode: 200,
                status: "success",
                message: 'all results details',
                result: listProperty[0]
            })

        } else {

            res.json({
                statusCode: 402,
                status: "success",
                message: 'Result Not Found',
            })
        }


    } catch (error) {
        res.json({
            statusCode: 500,
            status: "failed",
            message: 'Internal server error please try again something worng! catch',
        })
    }
}


module.exports = { pincode, properyById };