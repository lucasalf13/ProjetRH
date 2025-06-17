const { PrismaClient } = require("../../generated/prisma");
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()


exports.getAddEmploye = async (req, res) => {
    res.render('pages/addemploye.twig', {chef: req.session.chef});
}

exports.postAddEmploye = async (req, res) => {
    try {
        const employe = await prisma.employe.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mail: req.body.mail,
                password: await bcrypt.hash(req.body.password, 10),
                chefId: req.session.chef.id,
            }
        });
        res.redirect('/');
    } catch (error) {
        res.render('pages/addemploye.twig', {chef: req.session.chef});
    }
}

exports.deleteEmploye = async (req, res) => {
     try {
       const employe = await prisma.employe.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
    }
};

exports.getEditEmploye = async (req, res) => {
    try {
        const employe = await prisma.employe.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        res.render('pages/addemploye.twig', { employe, chef: req.session.chef });
    } catch (error) {
        res.redirect('/');
    }
};

exports.postEditEmploye = async (req, res) => {
    try {
      const employe =  await prisma.employe.update({
            where: { id: parseInt(req.params.id) },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                chefId: req.session.chef.id
            }
        });
        res.redirect('/');
    } catch (error) {
        const employe = await prisma.employe.findUnique({
            where: { id: parseInt(req.params.id) } 
        });
        res.render('pages/addemploye.twig', { employe });
    }
};