const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', username, function (err, rows, fields) {
            if (err) throw err;
            db.end();

            if (rows.length > 0) {
                var user = rows[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, {
                        id: user.idUsuario,
                        nombre: user.fullname,
                        nombreUsuario: user.nombreUsuario,
                        rol: user.rol
                    });
                }
            }
            else { return done(null, false, { authmessage: 'Nombre de usuario o contraseña incorrecto.' }); }
        });
    }
    ));



}