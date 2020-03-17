const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllers = require('.././controllers');
const middleware = require('.././middleware/auth');



router.get('/', controllers.HomeController.homePage);
router.get('/pagIngresar', controllers.UserController.getSignIn);
router.post('/pagIngresar', passport.authenticate('local', {
    successRedirect: '/homeLogIn',
    failureRedirect: '/pagIngresar',
    failureFlash: true
}));
router.get('/pagRegistrarse', controllers.UserController.getSignUp);
router.post('/pagRegistrarse', controllers.UserController.postSignUp);
router.get('/pagContacto', controllers.HomeController.pagContacto);
router.post('/contactAction', controllers.HomeController.contactAction);
router.get('/contact_send', (req, res) => {
    console.log('Request for contact send page recieved');
    res.render('contact_send');
});

router.get('/contact_error', (req, res) => {
    console.log('Request for contact error page recieved');
    res.render('contact_error');
});
router.get('/logout', controllers.UserController.logout);
router.get('/homeLogIn', middleware.isLogged, controllers.HomeController.homeLogIn);
router.get('/pagAcerca', controllers.HomeController.pagAcerca);
router.get('/quienesSomos', controllers.HomeController.quienesSomos);
router.get('/recursos', controllers.HomeController.recursos);
router.get('/galeria', controllers.HomeController.galeria);


//ADMIN
/*router.all('/admin/*', middleware.isAdmin);*/
router.get('/admin/adminUsuarios', controllers.AdminController.listarUsuarios);
router.post('/admin/agregarUsuarios', controllers.AdminController.agregarUsuarios);
router.get('/admin/eliminarUsuarios/:id', controllers.AdminController.eliminarUsuarios);
router.get('/admin/editarUsuarios/:id', controllers.AdminController.editarUsuarios);
router.post('/admin/actualizarUsuarios/:id', controllers.AdminController.actualizarUsuarios);

router.get('/admin/adminNoticias', controllers.AdminController.listarNoticias);
router.post('/admin/agregarNoticias', controllers.AdminController.agregarNoticias);
router.get('/admin/eliminarNoticias/:id', controllers.AdminController.eliminarNoticias);
router.get('/admin/editarNoticias/:id', controllers.AdminController.editarNoticias);
router.post('/admin/actualizarNoticias/:id', controllers.AdminController.actualizarNoticias);

router.get('/admin/adminRecursos', controllers.AdminController.listarRecursos);
router.post('/admin/agregarRecursos', controllers.AdminController.agregarRecursos);
router.get('/admin/eliminarRecursos/:id', controllers.AdminController.eliminarRecursos);
router.get('/admin/editarRecursos/:id', controllers.AdminController.editarRecursos);
router.post('/admin/actualizarRecursos/:id', controllers.AdminController.actualizarRecursos);

router.get('/admin/adminTipoUF', controllers.AdminController.listarTipoUF);
router.post('/admin/agregarTipoUF', controllers.AdminController.agregarTipoUF);
router.get('/admin/eliminarTipoUF/:id', controllers.AdminController.eliminarTipoUF);
router.get('/admin/editarTipoUF/:id', controllers.AdminController.editarTipoUF);
router.post('/admin/actualizarTipoUF/:id', controllers.AdminController.actualizarTipoUF);

module.exports = router;