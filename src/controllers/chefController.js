const { PrismaClient } = require("../../generated/prisma");
const hashedPasswordExtension = require("../services/extensions/hashPasswordExtension");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient().$extends(hashedPasswordExtension)

exports.getRegister = async (req, res) => {
    res.render('pages/register.twig');
}

exports.postRegister = async (req, res) => {
    try {

        if (!req.body.raisonSociale || !req.body.siret || !req.body.password || !req.body.confirmPassword) {
            throw { message: "Tous les champs doivent être remplis." };
        }
        if (!req.body.raisonSociale || req.body.raisonSociale.length < 3) {
            throw { raisonSociale: "La raison sociale doit contenir au moins 3 caractères." };
        }
        if (!req.body.siret || req.body.siret.length < 3) {
            throw { siret: "Le SIRET doit contenir au moins 3 caractères." };
        }
        if (req.body.password.length < 3) {
            throw { password: "Le mot de passe doit contenir au moins 3 caractères." };
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw { confirmPassword: "Les mots de passe ne correspondent pas." };
        }

        // Protection contre les doublons (c)
        const existingChef = await prisma.chef.findUnique({
            where: { siret: req.body.siret }
        });
        if (existingChef) {
            throw { siret: "Ce SIRET est déjà utilisé." };
        }

        // Création du chef
        const chef = await prisma.chef.create({
            data: {
                raisonSociale: req.body.raisonSociale,
                siret: req.body.siret,
                password: req.body.password
            }
        });

        res.redirect('/login');
    } catch (error) {
        res.render('pages/register.twig', { error });
    }
};

exports.getLogin = async (req, res) => {
    res.render('pages/login.twig');
}

exports.postLogin = async (req, res) => {
    try {
        if (!req.body.siret || !req.body.password) {
            throw { message: "Tous les champs doivent être remplis." };
        }
        if (!req.body.siret || req.body.siret.length < 3) {
            throw { siret: "Le SIRET doit contenir au moins 3 caractères." };
        }
        if (!req.body.password || req.body.password.length < 3) {
            throw { password: "Le mot de passe doit contenir au moins 3 caractères." };
        }

        const chef = await prisma.chef.findUnique({
            where: { siret: req.body.siret }
        });
        if (!chef) {
            throw { siret: "SIRET invalide." };
        }
        if (!(await bcrypt.compare(req.body.password, chef.password))) {
            throw { password: "Mot de passe invalide." };
        }

        req.session.chef = chef;
        res.redirect('/');
    } catch (error) {
        res.render('pages/login.twig', { error });
    }
};


exports.getLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}