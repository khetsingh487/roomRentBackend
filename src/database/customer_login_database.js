const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config();


let connection = require('./connetion');

const loginCustomer = (body, res) => {
    let phone = body.phone;
    // let userPassword = body.password;

    connection.query("SELECT * FROM `customer` where `phone`=?", [phone], function (err, data, fields) {
        if (err) {
            res.status(500).json({
                errorcode: 500,
                status: "success",
                message: 'record not found',
            })
        }
        // console.log(data);
        let hash = data[0].password;
        // console.log(hash);

        bcrypt.compare(body.password, hash, (error, result) => {
            if (error) {
                res.json({
                    status: 400,
                    message: 'password comparing error'
                })
            }

            if (result) {

                // console.log(process.env.JWT_SECRET_KEY);
                const token = jwt.sign(
                    { data },
                    'gfg_token_header_key',
                    {
                        expiresIn: "2h",
                    }
                );

                res.status(201).json({
                    status: 200,
                    message: 'logged in',
                    token: token
                });

            } else {
                res.json({
                    status: 400,
                    message: 'password Invalid'
                })
            }

        })

    });
}

module.exports = { loginCustomer };