//Author ********************
//Restful apis by NodeJs
//created on 31-10-2020

var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
"use strict";
const nodemailer = require("nodemailer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

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

        console.log(password);

        console.log("Message sent: %s", info.messageId);
        if (info.messageId) {
            res.send({ msg: "Done", status: 0 });
        } else {

        }
    } catch (err) {
        console.log(err);
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
}

function generatePdf(uuid, t_id, user_names, time_slot, _return, airport_name, seat, adults, children, amt, username) {

    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('./public/' + uuid + t_id + '.pdf'));

    // Embed a font, set the font size, and render some text
    doc
        .fontSize(30)
        .text('Air Food: Ticket!\n\n', 100, 100);

    doc
        .fontSize(15)
        .text("Booked by: " + username + "\nClass: " + user_names + "\nAirport Name: " + airport_name + "\nDeparture : " + time_slot + "\nTicket no: " + t_id + "\nSeat no: " + seat + "", 100, 200);


    doc
        .fontSize(15)
        .text("Adults: " + adults + "\nChildren: " + children + "\n\nAmount Total: R" + amt + "", 100, 300);


    // Finalize PDF file
    doc.end();
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
            if (error) {
                console.log(error);
            }
            if (rows.length > 0 && rows[0].salt) {
                var salt = rows[0].salt;//Getsalt from database
                var encrypted_password = rows[0].encrypted_password;
                //hash password from login
                var hashed_password = checkHashPassword(user_password, salt).passwordHash;
                if (encrypted_password == hashed_password) {
                    if (rows[0].isVerified == 1) {
                        res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
                    } else
                        if (rows[0].isVerified == 2) {
                            res.send({ msg: "Account is Deactivated, Reactivate in order to login to the platform", status: 1 });
                        } else {
                            res.send({ msg: "Email not is verified, check your emails and verify", status: 2 });
                        }
                } else {
                    res.send({ msg: "Wrong password", status: 3 });
                }
            } else {
                res.send({ msg: "user does not exist or invalid email recieved", status: 2 });
            }
        });

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2 });
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
        });

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
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
    var meals = JSON.parse(req.body.meals);
    var Class = req.body.Class;
    var time_slot = req.body.time_slot;
    var username = req.body.username;
    var totalAmt = req.body.totalAmt;
    var seat = getRandomArbitrary(1, 90);
    var t_id;
    if (children + adults <= 1) {
        seat = Class.substr(0, 1) + '' + Number(String(seat).substr(0, 2));
    } else {
        seat = Class.substr(0, 1) + '' + String(seat).substr(0, 2);
        n = (Number(seat.substr(1, 2)));
        for (let index = 1; index < (Number(children) + Number(adults)); index++) {
            n++;
            seat += ' ,' + Class.substr(0, 1) + '' + n;
        }
    }
    var names;

    try {
        db.query("INSERT INTO `booking` (uuid,  `class`, `departure`, `destination`, `depart_date`, `return_date`, `total_amount`) VALUES (?,  ?, ?, ?, ?, ?, ?)",
            [uuid, Class, from, to, depart.substr(0, 10), Return.substr(0, 10), totalAmt], function (err, rows0, fields) {
                t_id = rows0.insertId;
            }
        );

        depart = depart.substr(11, 5);
        Return = Return.substr(11, 5);
        //res.send({ status: 0, msg: 'Booked ticket', data: rows });
        db.query("INSERT INTO `ticket` (ticket_id, uuid, `airport_name`, `flight_no`, `boarding_time`, `departure_time`, `seat`, ispaid) VALUES ( ?,  ?, ?, ?, ?, ?, ?, 0)",
            [t_id, uuid, from, 'A909', time_slot, time_slot, seat], function (error, result, fields) {

            }
        );

        for (let index = 0; index < meals.length; index++) {
            db.query("INSERT INTO `meal` ( `t_id`, `meal_type`, `qty`, `meal_price`, `bev_type`, `bev_price`) VALUES ( ?, ?, ?, ?, ?, ?)",
                [t_id, meals[index].meal.text, meals[index].qty.value, meals[index].meal.value, '', 0.0], function (error, result, fields) {

                }
            );
        }
        generatePdf(uuid, t_id, Class, time_slot, Return, from.substr(0, from.length - 3) + ' International Airport', seat, adults, children, totalAmt, username);
        res.send({ status: 0, msg: 'done', t_id: t_id });


    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})

//get all users
app.post('/get_all_verrified_users', (req, res, next) => {
    try {
        db.query("SELECT uuid,DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `email`, `gender`, `province`, `role`,  `isVerified` FROM `user` WHERE isVerified=1",
            [], function (err, rows, fields) {

                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Could not add ticket", status: 1 });
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
        console.log(err);
    }
})
app.post('/get_all_nonverrified_users', (req, res, next) => {
    try {
        db.query("SELECT uuid,DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `email`, `gender`, `province`, `role`,  `isVerified` FROM `user` WHERE isVerified=0",
            [], function (err, rows, fields) {

                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all verified users", status: 1 });
                    console.log(err);
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})
app.post('/get_all_users_by_search', (req, res, next) => {
    var searchText = req.body.searchText;
    try {
        db.query("SELECT uuid,DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at,  `email`, `gender`, `province`, `role`,  `isVerified` FROM `user` WHERE `created_at` LIKE '%" + searchText + "%' OR `email` LIKE '%" + searchText + "%' OR role LIKE '%" + searchText + "%' ",
            [], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all users by search", status: 1 });
                    console.log(err);
                }
            }
        );
    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})
app.post('/get_all_users', (req, res, next) => {
    try {
        db.query("SELECT uuid, DATE_FORMAT(created_at,'%Y-%m-%d')  AS created_at, `email`,`gender`,`province`, `role`, `isVerified` FROM `user`",
            [], function (err, rows, fields) {

                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    res.send({ msg: "Couldn't get all users", status: 1 });
                    console.log(err);
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})
app.post('/register_admin', (req, res, next) => {
    var uuid = req.body.uuid;
    var ur = req.body.ur;
    try {
        db.query("UPDATE `user` SET `role`='" + ur + "' WHERE uuid = ?",
            [uuid], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    console.log(err);
                    res.send({ msg: "Something went wrong", status: 1 });
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})
app.post('/get_user_tickets', (req, res, next) => {
    var searchText = req.body.searchText;
    var uuid = req.body.uuid;
    try {
        db.query("SELECT * FROM `ticket` WHERE (boarding_time LIKE '%" + searchText + "%' OR airport_name LIKE '%" + searchText + "%' OR seat LIKE '%" + searchText + "%') AND uuid = '" + uuid + "' order by ticket_id desc",
            [uuid], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    console.log(err);
                    res.send({ msg: "Something went wrong", status: 1 });
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})
app.post('/add_user_payment', (req, res, next) => {
    var uuid = req.body.uuid;
    var payment_type = /*req.body.payment_type;*/ 1;
    var amount = req.body.amount;
    var card_number = req.body.card_number;
    var cvv = req.body.cvv;
    var expire_date = req.body.expire_date;
    var status = /*req.body.status;*/ 1;
    var ticket_id = req.body.ticket_id;

    try {
        db.query("INSERT INTO `payment` ( `ticket_id`,  `payment_type`, `amount`, `card_number`, `cvv`, `expire_date`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [ticket_id, payment_type, amount, card_number, cvv, expire_date.substr(0, 10), status], function (err, rows, fields) {
                if (rows) {
                    res.send({ status: 0, msg: 'done', data: rows });
                } else {
                    console.log(err);
                    res.send({ msg: "Something went wrong"+err, status: 1 });
                }
            }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
})

//index
app.get('/', (req, res, next) => {
    //generatePdf('52767ebf-8536-452a-9503-d2e03547cbbb'+45, 'paul phoku', '2020-11-12', '2020-11-2-', 'Cape Town Airport','E45');
    res.send({ msg: "Welcome to Kohaku!" });
})

app.get('/download/:filename', function (req, res) {
    let filename = req.params.filename;
    console.log(filename);

    const file = `${__dirname}/public/` + filename;
    res.download(file); // Set disposition and send it.
});

//activate user
app.post('/activate_user', (req, res, next) => {
    var email = req.body.email;
    try {
        db.query("SELECT `uuid` FROM user WHERE `user`.`email` = ?", [email], function (err, rows, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
            }

            if (rows) {
                verifyEmail(rows[0].uuid, email);
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Could not activate user", status: 1, });
            }
        }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
}
);

//verify email
app.post('/deactivate_user', (req, res, next) => {
    var uid = req.body.uuid;
    try {
        db.query("SELECT * FROM user WHERE uuid = ?", [uid], function (err, rows1, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
                res.send({ msg: "Could not verify password", status: 1 });
            }
            if (rows1.length > 0) {
                db.query("UPDATE `user` SET`isVerified` =? WHERE uuid = ?", [2, uid], function (err, rows, fields) {
                    res.send({ msg: "Succesfully Deactivated!", status: 0 });
                });
            } else {
                res.send({ msg: "Could not deactivate user", status: 1 });
            }
        });

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
    }
});

//activate user
app.post('/get_all_bookings', (req, res, next) => {
    var searchText = req.body.searchText;
    try {
        db.query("SELECT COUNT(destination) as tickets, SUM(total_amount) as tot_amt, destination,DATE_FORMAT(depart_date,'%Y-%m-%d') as depart_date FROM booking WHERE destination LIKE '%" + searchText + "%' OR  depart_date LIKE '%" + searchText + "%' GROUP BY destination,  depart_date ORDER BY depart_date DESC", [], function (err, rows, fields) {
            if (err) {
                console.log('MySQL ERROR', err);
            }

            if (rows) {
                res.send({ msg: "Done", status: 0, rows: rows.length, data: rows });
            } else {
                res.send({ msg: "Could not get bookings", status: 1, });
            }
        }
        );

    } catch (err) {
        res.send({ msg: 'Something went wrong' + err, status: 2, err: err });
        console.log(err);
    }
}
);

//start server
app.listen(port, () => {
    console.log('Server started on Port: ', port);
});

