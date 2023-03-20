
const login = require('../database/customer_login_database');

const loginCustomer = (req, res) => {
    let body = req.body;

    if (body.phone == "" || body.password == "") {
        res.status(404).json({
            status: "404",
            message: "Request Parameter Are Empity",
            value: body
        })
    } else {

        login.loginCustomer(body, res);

    };

}

module.exports = { loginCustomer };