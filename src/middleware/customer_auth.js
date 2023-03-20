const jwt = require('jsonwebtoken');

const customerAuthVerify = (req, res, next) => {

    const token = req.headers['authorization'];
    if (typeof (token) !== 'undefined') {
        let bearer = token.split(' ');
        let bearerToken = bearer[1];
        // console.log(bearerToken);
        jwt.verify(bearerToken, 'gfg_token_header_key', (err, authData) => {
            if (err) {
                res.status(403).json({
                    status: '403',
                    message: 'Invalid Autharization Token'
                })
            }
            next();

        });

    } else {
        res.status(403).json({
            status: 403,
            message: 'Authorization Token Is Not Found'
        })
    }


}

module.exports = customerAuthVerify;