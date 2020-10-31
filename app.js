//Author paulphoku
//Restful apis by NodeJs
//created on 31-10-2020


var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
"use strict";
const nodemailer = require("nodemailer");


//Defining the PORT
const port = process.env.PORT || 8080;

//Connect to Mysql
const db = require('./config/connection');
const { json } = require('body-parser');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: 'air.food@outlook.com',
        pass: 'admin@A!r'
    },
    tls: true,
});

//PASSWORD UTIL
var getRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') //convert to hexa format
        .slice(0, length); //return requred number of charecters
};
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); //Use SHA512
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};
function saltHashPassword(userPassword) {
    var salt = getRandomString(16); //Generate Randon String
    var passwordData = sha512(userPassword, salt);
    return passwordData;
};
function checkHashPassword(userPassword, salt) {
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}
//END PASSWORD UTIL


async function resetPass(email, password) {

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Air Food ✈️" <air.food@outlook.com>', // sender address
        to: "paulphoku@gmail.com", // list of receivers
        subject: "Forgot Password ✔", // Subject line
        text: "", // plain text body
        html: "<b>Your password has been reseted here is your new password:</b>"
            + "<br><h1>" + password + "</h1>"
            + "<br><br> <p>login to the application using the new passsword and head to profile to add your own unique password!</p>"
            + "<br><p>kind Regards</><br><p>Air Food ✈️", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

async function verifyEmail(uid) {
    // send mail with defined transport object
    let info = await transporter.sendMail({

        from: '"Air Food ✈️" <air.food@outlook.com>', // sender address
        to: "paulphoku@gmail.com", // list of receivers
        subject: "Verify email ✔", // Subject line
        text: "",                   // plain text body
        html: "<b>Hey there , please varify your email in order to login to our platform.<b>"
            + "<br><br>https://kohaku-b.herokuapp.com//verifyEmail/" + uid + ""
            + "<p>kind Regards</><br><p>Air Food ✈️", // html body
    });
    console.log(uid);
    console.log("Message sent: %s", info.messageId);
}

const app = express();
//middleware
app.use(bodyParser.json()); //Accespt json params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Register
app.post('/register', (req, res, next) => {
    var post_data = req.body; //get post params

    var uid = uuid.v4();
    var plaint_password = post_data.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt; //get salt
    var fname = post_data.fname;
    var lname = post_data.lname;
    var email = post_data.email;
    var otp = uuid.v4().substr(0, 6);
    otp = otp.toUpperCase();

    db.query('SELECT * FROM user WHERE email=?', [email], function (err, results, fields) {
        if (err) {
            console.log('MySQL ERROR', err);
        }
        if (results && results.length) {
            res.send({ msg: 'User already exists!!!' });
            console.log('User already exists!!!');
        } else {
            db.query("INSERT INTO `user` (`id`, `uuid`, `created_at`, `updated_at`, `names`, `surname`, `email`, `salt`, `encrypted_password`, `one_time_pin`) VALUES (NULL, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?)",
                [uid, fname, lname, email, salt, password, otp], function (err, rows, fields) {
                    if (err) {
                        console.log('MySQL ERROR', err);
                        res.send({ msg: "Could not register user", status: 1 });
                    } else {
                        verifyEmail(uid);
                        res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
                    }
                });
        }
    });
})

//login
app.post('/login', (req, res, next) => {
    var post_data = req.body;
    //Extract email and password from request
    var user_password = post_data.password;
    var email = post_data.email;

    db.query('Select * From user Where email=?', [email], function (error, rows, fields) {

        if (rows[0] && rows[0].salt) {
            var salt = rows[0].salt;//Getsalt from database
            var encrypted_password = rows[0].encrypted_password;
            //hash password from login
            var hashed_password = checkHashPassword(user_password, salt).passwordHash;
            if (encrypted_password == hashed_password) {
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Wrong password", status: 1 });
            }
        } else {
            res.send({ msg: "user not exist!!!", status: 2 });
        }
    });
});

//get user
app.get('/getUser/:user_id', (req, res, next) => {
    let user_id = req.params.user_id;
    db.query('SELECT * FROM user WHERE uuid=?', [user_id], function (error, result, fields) {
        if (result) {
            res.send({ status: 0, msg: 'done', data: result });
        } else {
            res.send({ msg: 'Something went wrong', status: 1 });
        }
    });
});

//update password
app.post('/updatePassword', (req, res, next) => {
    var post_data = req.body; //get post params
    var uuid = req.body.uuid;
    var plaint_password = post_data.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt; //get salt

    db.query("UPDATE `user` SET `salt`=?,`encrypted_password`=? WHERE uuid = ?",
        [salt, password, uuid], function (err, rows, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                res.send({ msg: "Could not change password", status: 1 });
            } else if (rows.changedRows > 0) {
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Could not change password", status: 1, data: rows });
            }
        }
    );
})

//reset password
app.get('/resetPassword/:email', (req, res, next) => {
    var email = req.params.email;
    var plaint_password = uuid.v4().substr(0, 8);
    plaint_password = plaint_password.toUpperCase();
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt; //get salt

    db.query("UPDATE `user` SET `salt`=?,`encrypted_password`=? WHERE email = ?",
        [salt, password, email], function (err, rows, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                res.send({ msg: "Could not change password", status: 1 });
            } else if (rows.changedRows > 0) {
                resetPass(email, plaint_password);
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Could not reset password", status: 1, data: rows });
            }
        }
    );
})

//verify email
app.get('/verifyemail/:uuid', (req, res, next) => {
    var uid = req.params.uuid;
    db.query("SELECT * FROM user WHERE uuid = ?", [uid], function (err, rows1, fields) {
        if (err) {
            console.log('MySQL ERROR', err);
            res.send({ msg: "Could not change password", status: 1 });
        }
        if (rows1.length > 0 && rows1[0].isVerified == 0) {
            db.query("UPDATE `user` SET`isVerified` =? WHERE uuid = ?", [1, uid], function (err, rows, fields) {
                res.send({ msg: "Done", status: 0, data: rows });
            });
        } else {
            res.send({ msg: "Email: " + rows1[0].email + " alredy verified", status: 1 });
        }
    });
})

//delete user
app.post('/delete_user/:uuid', (req, res, next) => {
    var uid = req.params.uuid;
    db.query("DELETE FROM `user` WHERE `user`.`uuid` = ?", [uid], function (err, rows, fields) {
        if (err) {
            console.log('MySQL ERROR', err);
        }

        if (rows.affectedRows) {
            res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
        } else {
            res.send({ msg: "Could not delete user", status: 1, });
        }
    }
    );
})

//update user
app.post('/update_user', (req, res, next) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var cell    = req.body.cell;
    var gender = req.body.gender;
    var province = req.body.province;
    var dob = req.dob;
    var uid = req.body.uuid;
    db.query("UPDATE `user` SET `updated_at`=NOW(),`names`=?,`surname`=?,`email`=?,`cell`=?,`gender`=?,`province`=?,`date_of_birth`=? WHERE uuid = ?", 
    [fname, lname, email, cell, gender, province, dob, uid], function (err, rows, fields) {
        if (err) {
            console.log('MySQL ERROR', err);
        }

        if (rows && rows.affectedRows) {
            res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
        } else {
            res.send({ msg: "Could not update user", status: 1, });
        }
    });
})




//start server
app.listen(port, () => {
    console.log('Server started on Port: ', port);
});

