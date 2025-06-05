const authguard = async(req, res, next) => {
    try{
        if(req.session && req.session.chef){
            return next();
        }
        else throw ("Utilisateur non connecté")
    }
    catch(error){
        res.redirect("/login")
    }
}

module.exports = authguard
