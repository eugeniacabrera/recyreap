const mysql = require('mysql');
const bcrypt = require ('bcryptjs');


module.exports = {
    getSignUp : function (req, res, next){
        return res.render('pagRegistrarse');
    } ,

    postSignUp : function (req, res, next){
        
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.contraseña, salt);

        var user = {
            nombreUsuario : req.body.nombre_usuario,
            password : password,
            fullname : req.body.nombre_completo,
            email : req.body.email,
            pais : req.body.pais,
            ciudad : req.body.ciudad,
            lugarDeTrabajo : req.body.lugar_trabajo,
            puestoDeTrabajo : req.body.puesto_trabajo,
            rol : req.body.rol
        }

        var config = require('../database');

        var db = mysql.createConnection(config); 
       
        db.connect();

        db.query('INSERT INTO usuarios SET ?', user, function(err, rows, fields){
            if (err) throw err;

            db.end();
        });
        
        return res.redirect('/pagIngresar');
    },

    getSignIn : function (req, res, next){
        return res.render('pagIngresar');
    },

    logout : function (req, res, next){
        req.logout();
        res.redirect('/pagIngresar');
    }


};
