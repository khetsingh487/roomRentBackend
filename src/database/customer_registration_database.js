let connection = require('./connetion');

const getAllCustomers = (res) => {
    connection.query("SELECT * FROM `customer`", function (err, data, fields) {
        if (err) {
                res.status(500).json({
                    errorcode: 500,
                    status: "success",
                    message: 'record not found',
                })
        }
        res.status(200).json({
            errorcode: 200,
            status: "success",
            message: 'all customer details',
            data: data
        })
    });

}

const getOneCustomer = (id, res) => {
    connection.query("SELECT * FROM `customer` where id = ?", [id], function (err, data, fields) {
        if (err) {
            res.status(500).json({
                errorcode: 500,
                status: "success",
                message: 'record not found',
            })
        }
        res.status(200).json({
            errorcode: 200,
            status: "success",
            message: 'all customer details',
            data: data
        })
    });

}

const registerCustomer = (data, res) => {
    let body = data;

    let value = [body.name, body.email, body.phone, body.password];
    // res.send(value);
    connection.query("SELECT COUNT(id) as count FROM customer WHERE `phone`=?", [body.phone], (error, results, fields) => {
        if (error) {
            res.status(500).json({
                errorcode: 500,
                status: "success",
                message: 'please try again something worng!',
            })
        }

        if (results[0].count > 0) {
            res.status(200).json({
                errorcode: 200,
                status: "success",
                message: 'This Number Is Already Registered!',
                data: results[0].count
            })

        } else {

            connection.query("INSERT INTO `customer`(`name`, `email`, `phone`, `password`) VALUES (?)", [value], function (error, results, fields) {
                if (error) {
                    res.status(500).json({
                        errorcode: 500,
                        status: "success",
                        message: 'please try again something worng!',
                    })

                } else if (results.affectedRows > 0) {
                    res.status(201).json({
                        errorcode: 201,
                        status: "success",
                        message: 'User Is Registered',
                        data: results.affectedRows
                    })
                }

            });

        }

    })

}

const updateCustomer = (data, res) => {

    connection.query("UPDATE customer SET `name`=?, `email`=?, `phone`=? WHERE `id`=? ", [data.name, data.email, data.phone, data.id], (error, results, fields) => {
        if (error) {
            res.status(500).json({
                errorcode: 500,
                status: "success",
                message: 'please try again something worng!',
            })
        } else if (results.affectedRows > 0) {
            res.status(200).json({
                errorcode: 200,
                status: "success",
                message: 'Updated User Details',
                data: results.affectedRows
            })
        } else {
            res.status(200).json({
                errorcode: 200,
                status: "success",
                message: 'This is is not found!',
                data: results.affectedRows
            })
        }

    })

}

const deleteCustomer = (id, res) => {
    connection.query("DELETE FROM customer WHERE `id`=? ", [id], (error, results, fields) => {
        if (error) {

            res.status(404).json({
                errorcode: 404,
                status: "success",
                message: 'please try again something worng!',
            })

        } else if (results.affectedRows > 0) {

            res.status(200).json({
                errorcode: 200,
                status: "success",
                message: 'User Is Successfully Deleted',
                data: results.affectedRows
            })

        } else {

            res.status(200).json({
                errorcode: 200,
                status: "success",
                message: 'User Not Found',
                data: results.affectedRows
            })

        }
    })
}

module.exports = { getAllCustomers, getOneCustomer, updateCustomer, registerCustomer, deleteCustomer };