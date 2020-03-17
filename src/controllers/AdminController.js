const mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports = {

    //  CRUD USUARIOS

    listarUsuarios: function(req, res, next) {

        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM usuarios', (err, usuarios) => {
            if (err) {
                res.json(err);
            }
            res.render('adminUsuarios', { data: usuarios, isAuthenticated: req.isAuthenticated(), user: req.user });
        });
    },

    agregarUsuarios: function(req, res, next) {
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.contraseña, salt);

        var user = {
            nombreUsuario: req.body.nombre_usuario,
            password: password,
            fullname: req.body.nombre_completo,
            email: req.body.email,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            lugarDeTrabajo: req.body.lugar_trabajo,
            puestoDeTrabajo: req.body.puesto_trabajo,
            rol: req.body.rol
        }
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('INSERT INTO usuarios SET ?', user, function(err, rows, fields) {
            if (err) res.json(err);
            console.log(user);
            res.redirect('/admin/adminUsuarios');
            db.end();
        });
    },

    editarUsuarios: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, usuarios) => {
            res.render('editarUsuarios', { data: usuarios[0] });
            db.end();
        });
    },

    actualizarUsuarios: function(req, res, next) {
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.contraseña, salt);
        var user = {
            nombreUsuario: req.body.nombre_usuario,
            password: password,
            fullname: req.body.nombre_completo,
            email: req.body.email,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            lugarDeTrabajo: req.body.lugar_trabajo,
            puestoDeTrabajo: req.body.puesto_trabajo,
            rol: req.body.rol
        }
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('UPDATE usuarios set ? where idUsuario = ' + req.params.id, user, function(err, rows) {
            if (err) res.json(err);
            console.log(user);
            res.redirect('/admin/adminUsuarios');
            db.end();
        });

    },

    eliminarUsuarios: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, rows) => {
            if (err) res.json(err);
            else res.redirect('/admin/adminUsuarios');
            db.end();
        });

    },

    //  CRUD NOTICIAS
    listarNoticias: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM noticias', (err, noticias) => {
            if (err) {
                res.json(err);
            }
            res.render('adminNoticias', { data: noticias });
        });

    },

    agregarNoticias: function(req, res, next) {

        let fechaPublicacion = new Date();
        var noticia = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            fechaPub: fechaPublicacion,
            imagen: req.body.imagen
        }
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('INSERT INTO noticias SET ?', noticia, function(err, rows, fields) {
            if (err) res.json(err);
            else
                return res.redirect('/admin/adminNoticias');

            db.end();
        });
    },

    editarNoticias: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM noticias WHERE idNoticia = ?', [id], (err, noticias) => {
            res.render('editarNoticias', { data: noticias[0] });
            db.end();
        });
    },

    actualizarNoticias: function(req, res, next) {
        let fechaPublicacion = new Date();
        var noticia = {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            fechaPub: fechaPublicacion,
            imagen: req.body.imagen
        }
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('UPDATE noticias set ? where idNoticia = ' + req.params.id, noticia, function(err, rows) {
            if (err) res.json(err);
            res.redirect('/admin/adminNoticias');
            db.end();
        });

    },

    eliminarNoticias: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('DELETE FROM noticias WHERE idNoticia = ?', [id], (err, rows) => {
            if (err) res.json(err);
            res.redirect('/admin/adminNoticias');
            db.end();
        });

    },

    //  CRUD RECURSOS  
    listarRecursos: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM recursos', (err, recursos) => {
            if (err) {
                res.json(err);
            }
            res.render('adminRecursos', { data: recursos, isAuthenticated: req.isAuthenticated(), user: req.user });
        });
    },

    agregarRecursos: function(req, res, next) {

        // var lista = document.getElementById("idTipoUF");
        // var indiceSeleccionado = lista.selectedIndex;
        // var opcionSeleccionada = lista.options[indiceSeleccionado];
        // var valorSeleccionado = opcionSeleccionada.value;

        var recurso = {
            idTipoUF: req.body.tipoUF,
            idUsuariofk: req.user.id,
            fechaPub: req.body.fechaPub,
            url: req.body.url,
            duracion: req.body.duracion,
            descripcion: req.body.descripcion,
            localidad: req.body.localidad,
            institucion: req.body.institucion,
            nivelTurnoEdades: req.body.nivelTurnoEdades,
            cantEstudiantes: req.body.cantEstudiantes,
            nombreDocente: req.body.nombreDocente,
            acercaDocente: req.body.acercaDocente,
            protocolosSugeridos: req.body.protocolosSugeridos,
            otrosDatos: req.body.otrosDatos,
            titulo: req.body.titulo,
            asignatura: req.body.asignatura,
        }

        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('INSERT INTO recursos SET ?', recurso, function(err, rows, fields) {
            if (err) res.json(err);
            else res.redirect('/admin/adminRecursos');
            db.end();
        });
    },

    editarRecursos: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM recursos WHERE idRecurso = ?', [id], (err, recursos) => {
            res.render('editarRecursos', { data: recursos[0] });
            db.end();
        });
    },

    actualizarRecursos: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();


        var recurso = {
            idTipoUF: req.body.tipoUF,
            idUsuariofk: req.user.id,
            fechaPub: req.body.fechaPub,
            url: req.body.url,
            duracion: req.body.duracion,
            descripcion: req.body.descripcion,
            localidad: req.body.localidad,
            institucion: req.body.institucion,
            nivelTurnoEdades: req.body.nivelTurnoEdades,
            cantEstudiantes: req.body.cantEstudiantes,
            nombreDocente: req.body.nombreDocente,
            acercaDocente: req.body.acercaDocente,
            protocolosSugeridos: req.body.protocolosSugeridos,
            otrosDatos: req.body.otrosDatos,
            titulo: req.body.titulo,
            asignatura: req.body.asignatura,
        }

        db.query('UPDATE recursos set ? where idRecurso = ' + req.params.id, recurso, function(err, rows) {
            if (err) res.json(err);
            else res.redirect('/admin/adminRecursos');
            db.end();
        });

    },

    eliminarRecursos: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('DELETE FROM recursos WHERE idRecurso = ?', [id], (err, rows) => {
            if (err) res.json(err);
            res.redirect('/admin/adminRecursos');
            db.end();
        });

    },

    //  CRUD TIPOUF
    listarTipoUF: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM tipouf', (err, tipoUF) => {
            if (err) {
                res.json(err);
            }
            res.render('adminTipoUF', { data: tipoUF, isAuthenticated: req.isAuthenticated(), user: req.user });
        });
    },

    agregarTipoUF: function(req, res, next) {

        var tipoUF = {
            nombre: req.body.nombre,
            protocolo: req.body.protocolo
        }
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('INSERT INTO tipouf SET ?', tipoUF, function(err, rows, fields) {
            if (err) res.json(err);
            res.redirect('/admin/adminTipoUF');
            db.end();
        });
    },

    editarTipoUF: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT * FROM tipouf WHERE idTipoUF = ?', [id], (err, tipoUF) => {
            res.render('editarTipoUF', { data: tipoUF[0] });
            db.end();
        });
    },

    actualizarTipoUF: function(req, res, next) {
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();

        var tipoUF = {
            nombre: req.body.nombre,
            protocolo: req.body.protocolo
        }

        db.query('UPDATE tipouf set ? where idTipoUF = ' + req.params.id, tipoUF, function(err, rows) {
            if (err) res.json(err);
            res.redirect('/admin/adminTipoUF');
            db.end();
        });

    },

    eliminarTipoUF: function(req, res, next) {
        const { id } = req.params;
        const config = require('../database');
        const db = mysql.createConnection(config);
        db.connect();
        db.query('DELETE FROM tipouf WHERE idTipoUF = ?', [id], (err, rows) => {
            if (err) res.json(err);
            res.redirect('/admin/adminTipoUF');
            db.end();
        });

    }

}