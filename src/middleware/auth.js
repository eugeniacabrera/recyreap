module.exports = {

    isLogged : function (req, res, next){
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/pagIngresar');
        }
    },

    isAdmin : function (req, res, next) {
      if (req.user && req.user.rol === "Administrador")
        next();
      else
        res.sendStatus(401);
    }

    
}