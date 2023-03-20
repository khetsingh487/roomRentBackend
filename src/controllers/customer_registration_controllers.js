const bcrypt = require("bcrypt");
const customer = require('../database/customer_registration_database');

const getAllCustomers = (req, res) => {
    customer.getAllCustomers(res);
};


const getOneCustomer = (req, res) => {
    // let getOneCustomer = customer.getOneCustomer();
    let id = req.params.customerId;
    customer.getOneCustomer(id, res);
};

const registerCustomer = (req, res) => {
    let body = req.body;

    bcrypt.hash(body.password, 10, (error, hash) => {
        // console.log(hash);
        if (error) {
            res.status(404).json({ status: 404, message: 'password hashing issue' });
        }
        body.password = hash;
        // console.log(body);

        if (body.name !== '' && body.email !== '' && body.phone !== '' && body.password !== '') {
            // res.send('name and email are empty');
            customer.registerCustomer(body, res);

        } else {
            res.status(404).json({ status: 404, message: 'request parameters are empity' });
        }
    });

    // bcrypt.compare(body.password, '$2b$10$p9Hp5kMco22u0NojVRv9COsJTDQ/LSYF3MOJCjgqWqQV3LMFW2Hqu', (error, result) => {
    //     console.log(result);
    // }) 
};

const updateCustomer = (req, res) => {
    let body = req.body;
    // console.log(body);
    if (body.name !== '' && body.email !== '' && body.phone !== '') {
        // res.send('name and email are empty');
        customer.updateCustomer(body, res);
    } else {
        res.status(404).json({ status: 404, message: 'Request Parameters Are Empity' });
    }
};

const deleteCustomer = (req, res) => {
    // let deleteCustomer = customer.deleteCustomer();
    // res.send("delete customer details");
    let id = req.params.customerId;
    // console.log(id);
    customer.deleteCustomer(id, res);
};


// this is only for demo purpose 
const demo = (req, res) => {
    res.json({
        status: 200,
        message: "checking how same router can work",
        value:req.query
    })
};

module.exports = { getAllCustomers, getOneCustomer, registerCustomer, updateCustomer, deleteCustomer,demo };