const { PrismaClient } = require("../../generated/prisma");
const hashedPasswordExtension = require("../services/extensions/hashPasswordExtension");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient().$extends(hashedPasswordExtension)

exports.getRegister = async (req, res) => {
    res.render('pages/register.twig');
}

exports.postRegister = async (req, res) => {
    try {
        if (req.body.password === req.body.confirmPassword) {
            const chef = await prisma.chef.create({
                data: {
                    raisonSociale: req.body.raisonSociale,
                    siret: req.body.siret,
                    password: req.body.password
                }
            })
            res.redirect('/login');            
        }
        else throw ({ confirmPassword: "Passwords do not match" })
    }
    catch (error) {        
        res.render('pages/register.twig', {error})
    }
}

exports.getLogin = async (req, res) => {
    res.render('pages/login.twig');
}

exports.postLogin = async (req, res) => {
    try {
        const chef = await prisma.chef.findUnique({
            where: {
                siret: req.body.siret
            }
        });
        if (chef) {
            if (await bcrypt.compare(req.body.password, chef.password)) {
                req.session.chef = chef;
                res.redirect('/');
            } else {
                throw ({ password: "mot de passe invalide" });
            }
        } else {
            throw ({ siret: "SIRET invalide" });
        }
    } catch (error) {        
        res.render('pages/login.twig', { error });
    }
};


exports.getLogout = async (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}