
const DB = require('../config/config');
// console.log(DB.db.host);

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: DB.db.host,
    user: DB.db.user,
    password: DB.db.password,
    database: DB.db.database,
});
// console.log(connection);
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
