//Author paulphoku@gmail.com
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


async function resetPass(email, password, res) {
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Air Food ✈️" <air.food@outlook.com>', // sender address
            to: email, // list of receivers
            subject: "Forgot Password ✔", // Subject line
            text: "", // plain text body
            html: "<b>Your password has been reseted here is your new password:</b>"
                + "<br><h1>" + password + "</h1>"
                + "<br><br> <p>login to the application using the new passsword and head to profile to add your own unique password!</p>"
                + "<br><p>kind Regards</><br><p>Air Food ✈️", // html body
        });

        console.log("Message sent: %s", info.messageId);
        if (info.messageId) {
            res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
        } else {

        }
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }


}

async function verifyEmail(uid, email) {
    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Air Food ✈️" <air.food@outlook.com>', // sender address
            to: email, // list of receivers
            subject: "Verify email ✔", // Subject line
            text: "",                   // plain text body
            html: "<b>Hey there , please varify your email in order to login to our platform.<b>"
                + "<br><br>https://kohaku-b.herokuapp.com/verifyemail/" + uid + ""
                + "<p>kind Regards</><br><p>Air Food ✈️", // html body
        });
        console.log(uid);
        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }

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
    try {
        db.query('SELECT * FROM user WHERE email=?', [email], function (err, results, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
            }
            if (results && results.length) {
                res.send({ msg: 'User already exists!!!' });
                console.log('User already exists!!!');
            } else {
                db.query("INSERT INTO `user` (`id`, `uuid`, `created_at`, `updated_at`, `name`, `surname`, `email`, `salt`, `encrypted_password`, `one_time_pin`) VALUES (NULL, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?)",
                    [uid, fname, lname, email, salt, password, otp], function (err, rows, fields) {
                        if (err) {
                            console.log('MySQL ERROR', err);
                            res.send({ msg: "Could not register user", status: 1 });
                        } else {
                            verifyEmail(uid, email);
                            res.send({ msg: "Succesfully Registered, Check your email to verify account in order to login", status: 0, rows: rows.length, data: rows });
                        }
                    }
                );
            }
        });
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }

})

//login
app.post('/login', (req, res, next) => {
    var post_data = req.body;
    //Extract email and password from request
    var user_password = post_data.password;
    var email = post_data.email;

    try {
        db.query('Select * From user Where email=?', [email], function (error, rows, fields) {
            if (rows.length > 0 && rows[0].salt) {
                var salt = rows[0].salt;//Getsalt from database
                var encrypted_password = rows[0].encrypted_password;
                //hash password from login
                var hashed_password = checkHashPassword(user_password, salt).passwordHash;
                if (encrypted_password == hashed_password) {
                    if (rows[0].isVerified == 1) {
                        res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
                    } else {
                        res.send({ msg: "Email not is verified, check your emails and verify", status: 1 });
                    }
                } else {
                    res.send({ msg: "Wrong password", status: 1 });
                }
            } else {
                res.send({ msg: "user does not exist or invalid email recieved", status: 2 });
            }
        });
    } catch (err) {
        res.send({ msg: 'Something went wrong'+err, status: 2 });
    }

});

//get user
app.post('/getUser', (req, res, next) => {
    try {
        let user_id = req.body.uuid;
        db.query('SELECT * FROM user WHERE uuid=?', [user_id], function (error, result, fields) {
            if (result) {
                res.send({ status: 0, msg: 'done', data: result });
            } else {
                res.send({ msg: 'Something went wrong', status: 1 });
            }
        });
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
});

//update password
app.post('/update_password', (req, res, next) => {
    var uuid = req.body.uuid;
    var plaint_password = req.body.password;
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt; //get salt

    try {
        db.query("UPDATE `user` SET `salt`=?,`encrypted_password`=? WHERE uuid = ?",
            [salt, password, uuid], function (err, rows, fields) {
                if (err) {
                    //console.log('MySQL ERROR', err);
                    res.send({ msg: "Could not change password", status: 1 });
                } else if (rows.changedRows > 0) {
                    res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
                } else {
                    res.send({ msg: "Could not change password", status: 1, data: rows });
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }


})

//reset password
app.get('/resetPassword/:email', (req, res, next) => {
    var email = req.params.email;
    var plaint_password = uuid.v4().substr(0, 8);
    plaint_password = plaint_password.toUpperCase();
    var hash_data = saltHashPassword(plaint_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt; //get salt

    try {
        db.query("UPDATE `user` SET `salt`=?,`encrypted_password`=? WHERE email = ?",
            [salt, password, email], function (err, rows, fields) {
                if (err) {
                    //console.log('MySQL ERROR', err);
                    res.send({ msg: "Could not change password", status: 1 });
                } else if (rows.changedRows > 0) {
                    resetPass(email, plaint_password, res);
                } else {
                    res.send({ msg: "Invalid email recieved or email not registered", status: 1, data: rows });
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//verify email
app.get('/verifyemail/:uuid', (req, res, next) => {
    var uid = req.params.uuid;
    try {
        db.query("SELECT * FROM user WHERE uuid = ?", [uid], function (err, rows1, fields) {
            if (err) {
                //console.log('MySQL ERROR', err);
                res.send({ msg: "Could not verify password", status: 1 });
            }
            if (rows1.length > 0 && rows1[0].isVerified == 0) {
                db.query("UPDATE `user` SET`isVerified` =? WHERE uuid = ?", [1, uid], function (err, rows, fields) {
                    res.send({ msg: "<h1>Succesfully verified password</h1>" });
                });
            } else {
                res.send({ msg: "<h1>Email: " + rows1[0].email + " alredy verified</h1>", status: 1 });
            }
        });
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//delete user
app.post('/delete_user', (req, res, next) => {
    var uid = req.body.uuid;
    try {
        db.query("DELETE FROM `user` WHERE `user`.`uuid` = ?", [uid], function (err, rows, fields) {
            if (err) {
                //console.log('MySQL ERROR', err);
            }

            if (rows.affectedRows) {
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Could not delete user", status: 1, });
            }
        }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//update user
app.post('/update_user', (req, res, next) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var cell = req.body.cell;
    var gender = req.body.gender;
    var province = req.body.province;
    var dob = req.dob;
    var uid = req.body.uuid;

    try {
        db.query("UPDATE `user` SET `updated_at`=NOW(),`name`=?,`surname`=?,`email`=?,`cell`=?,`gender`=?,`province`=? WHERE uuid = ?",
            [fname, lname, email, cell, gender, province, uid], function (err, rows, fields) {

                if (rows && rows.affectedRows) {
                    res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
                } else {
                    res.send({ msg: "Could not update user", status: 1, });
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//ADD user flight
app.post('/add_ticket', (req, res, next) => {
    var uuid = req.body.uuid;
    var from = req.body.from;
    var to = req.body.to;
    var Return = req.body.Return;
    var depart = req.body.depart;
    var adults = req.body.adults;
    var children = req.body.children;
    var adult_price = req.body.adult_price;
    var child_price = req.body.child_price;
    var meals = req.body.meals;
    var Class = req.body.Class;
    var totalAmt = 0;

    depart = depart.substr(0, 10);
    Return = Return.substr(0,10);

    try {
        db.query("INSERT INTO `booking` ( `class`, `departure`, `destination`, `depart_date`, `return_date`, `total_amount`) VALUES ( ?, ?, ?, ?, ?, ?)",
            [Class, from, to, depart, Return, totalAmt], function (err, rows, fields) {
                if (err) {
                    console.log('MySQL ERROR', err);
                }
                if (rows) {
                    res.send({ status: 0, msg: 'Booked ticket', data: rows });
                    // db.query("INSERT INTO `ticket` (`ticket_id`, `uuid`, `airport_name`, `flight_no`, `boarding_time`, `departure_time`, `seat`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
                    //  [user_id], function (error, result, fields) {
                    //     let t_id = rows.insertId;
                    //     if (result) {
                    //         res.send({ status: 0, msg: 'done', data: result });
                    //     } else {
                    //         res.send({ msg: 'Something went wrong', status: 1 });
                    //     }
                    // });
                } else {
                    res.send({ msg: "Could not add ticket", status: 1, });
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//get all users
app.post('/get_all_verrified_users', (req, res, next) => {
    try {
        db.query("SELECT `id`, `uuid`, DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `updated_at`, `name`, `surname`, `email`, `cell`, `gender`, `province`, `salt`, `encrypted_password`, `role`, `date_of_birth`, `one_time_pin`, `isVerified` FROM `user` WHERE isVerified=1",
            [], function (err, rows, fields) {
            
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Could not add ticket", status: 1});
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
        console.log(err);
    }
})

app.post('/get_all_nonverrified_users', (req, res, next) => {
    try {
        db.query("SELECT `id`, `uuid`, DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `updated_at`, `name`, `surname`, `email`, `cell`, `gender`, `province`, `salt`, `encrypted_password`, `role`, `date_of_birth`, `one_time_pin`, `isVerified` FROM `user` WHERE isVerified=0",
            [], function (err, rows, fields) {
            
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all verified users", status: 1});
                    console.log(err);
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

app.post('/get_all_users_by_search', (req, res, next) => {
    var searchText = req.body.searchText;
    try {
        db.query("SELECT `id`, `uuid`, DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `updated_at`, `name`, `surname`, `email`, `cell`, `gender`, `province`, `salt`, `encrypted_password`, `role`, `date_of_birth`, `one_time_pin`, `isVerified` FROM `user` WHERE `created_at` LIKE '%"+searchText+"%' OR `email` LIKE '%"+searchText+"%' OR role LIKE '%"+searchText+"%' ",
            [], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all users by search", status: 1});
                    console.log(err);
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

app.post('/get_all_users', (req, res, next) => {
    try {
        db.query("SELECT `id`, `uuid`, DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `updated_at`, `name`, `surname`, `email`, `cell`, `gender`, `province`, `salt`, `encrypted_password`, `role`, `date_of_birth`, `one_time_pin`, `isVerified` FROM `user`",
            [], function (err, rows, fields) {
            
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all users", status: 1});
                    console.log(err);
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

app.post('/register_admin', (req, res, next) => {
    var uuid = req.body.uuid;
    var ur = req.body.ur;
    try {
        db.query("UPDATE `user` SET `role`='"+ur+"' WHERE uuid = ?",
            [uuid], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    console.log(err);
                    res.send({ msg: "Something went wrong", status: 1});
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong', status: 2 });
    }
})

//index
app.get('/', (req, res, next) => {
    res.send({ msg: "Welcome to Kohaku!" });
})

//start server
app.listen(port, () => {
    console.log('Server started on Port: ', port);
});

