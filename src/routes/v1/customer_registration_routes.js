const express = require("express");
const router = express.Router();

const customerRegistrationController = require('../../controllers/customer_registration_controllers');


router.get("/", customerRegistrationController.getAllCustomers);


router.get("/:customerId", customerRegistrationController.getOneCustomer);

router.post("/", customerRegistrationController.registerCustomer);

router.put("/", customerRegistrationController.updateCustomer);

router.delete("/:customerId", customerRegistrationController.deleteCustomer);


router.get("/query", customerRegistrationController.demo);
router.use('*', (req, res) => {
    res.json({
        status: 404,
        message: 'invalid request'
    })
})

module.exports = router;