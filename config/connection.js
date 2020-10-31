const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');


//- Connection configuration
var db_config = {
    host: 'bbu5zmw8d8gzsue0km7n-mysql.services.clever-cloud.com',
    user: 'uitpkpdgmwkcwamk',
    password: 'Ju3vgZ1X638e2xWkTy2I',
    database: 'bbu5zmw8d8gzsue0km7n'
};

var smtp = {
    user: 'air.food@outlook.com',
    pass: 'admin@A!r'
}

//- Create the connection variable
var db = mysql.createConnection(db_config);

// //- Establish a new connection
// db.connect(function(err){
//     if(err) {
//         // mysqlErrorHandling(connection, err);
//         console.log("\n\t *** Cannot establish a connection with the database. ***");

//         db = reconnect(db);
//     }else {
//         console.log("\n\t *** New connection established with the database. ***")
//     }
// });

// //- Reconnection function
// function reconnect(db){
//     console.log("\n New connection tentative...");

//     //- Destroy the current connection variable
//     if(db) db.destroy();

//     //- Create a new one
//     var db = mysql.createConnection(db_config);

//     //- Try to reconnect
//     db.connect(function(err){
//         if(err) {
//             //- Try to connect every 2 seconds.
//             setTimeout(reconnect, 2000);
//         }else {
//             console.log("\n\t *** New connection established with the database. ***")
//             return db;
//         }
//     });
// }

// //- Error listener
// db.on('error', function(err) {

//     //- The server close the connection.
//     if(err.code === "PROTOCOL_CONNECTION_LOST"){    
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
//         db = reconnect(db);
//     }

//     //- Connection in closing
//     else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
//         db = reconnect(db);
//     }

//     //- Fatal error : connection variable must be recreated
//     else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
//         db = reconnect(db);
//     }

//     //- Error because a connection is already being established
//     else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
//     }

//     //- Anything else
//     else{
//         console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
//         db = reconnect(db);
//     }

// });

module.exports = db;
