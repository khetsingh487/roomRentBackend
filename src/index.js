const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
const jwt = require('jsonwebtoken');
const cutomerAuth = require('./middleware/customer_auth');

const v1CustomerRegistration = require('./routes/v1/customer_registration_routes');
const v1CustomerLogin = require('./routes/v1/customer_login_router');
const v1ListProperty = require('./routes/v1/list_property');

const v1searchproperty = require('./routes/v1/search_properties');

app.use('/routes/v1/customerRegistration', v1CustomerRegistration);

app.use('/routes/v1/customerLogin', v1CustomerLogin);

//add property by owner of house

app.use('/routes/v1/listproperty', v1ListProperty);

app.use('/routes/v1/searchproperty', v1searchproperty);

app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`API is listening on port ${ PORT }`);
}); 