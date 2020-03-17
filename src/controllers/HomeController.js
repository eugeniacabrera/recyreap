const mysql = require('mysql');
const nodemailer = require('nodemailer');

module.exports = {

    homePage: function(req, res, next) {

        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM noticias', (err, noticias) => {
            if (err) {
                res.json(err);
            }
            res.render('homePage', { data: noticias });
        });
    },

    recursos: function(req, res, next) {
        res.render('recursos', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    homeLogIn: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM noticias', (err, noticias) => {
            if (err) {
                res.json(err);
            }
            res.render('homeLogIn', { data: noticias, isAuthenticated: req.isAuthenticated(), user: req.user });
        });

    },

    pagAcerca: function(req, res, next) {
        res.render('pagAcerca', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    pagContacto: function(req, res, next) {
        res.render('pagContacto', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },

    contactAction: function(req, res, next) {

        var nombre = req.body.nombre;
        var email = req.body.email;
        var mensaje = req.body.mensaje;

        var emailMessage = `Hi ${nombre},\n\nThank you for contacting us.\n\nYour email is: ${email}.\n\nYour enquiry is: ${mensaje}\n.`;


        // Instantiate the SMTP server
        const smtpTrans = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'kukicabrera09@gmail.com',
                pass: ''
            }
        });

        // Specify what the email will look like
        var emailOptions = {
            from: email,
            to: 'kukicabrera09@gmail.com',
            text: mensaje
        };

        smtpTrans.sendMail(emailOptions, (err, info) => {
            if (error) {
                console.log(error);
                res.redirect('/contact_error');
            } else {
                res.redirect('/contact_send');
            }
        });

    },

    quienesSomos: function(req, res, next) {
        res.render('quienesSomos', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },


    adminUsuarios: function(req, res, next) {
        res.render('adminUsuarios', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },


    galeria: function(req, res, next) {

        res.render('galeria', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    }
}