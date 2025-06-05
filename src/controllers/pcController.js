const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient()


exports.getAddPc = async (req, res) => {
    const employes = await prisma.employe.findMany({
        where: { chefId: req.session.chef.id, pc: null } // Employés sans ordinateur
    });
    res.render('pages/addpc.twig', { pc: null, employes , chef: req.session.chef }); // Envoie la liste des employés sans PC
};

exports.postAddPc = async (req, res) => {
    try {
        const pc = await prisma.pc.create({
            data: {
                adresseMac: req.body.adresseMac,
                chefId: req.session.chef.id,
            }
        });
        res.redirect('/');
    } catch (error) {
        res.render('pages/addpc.twig', {chef: req.session.chef});
    }
}

exports.deletePc = async (req, res) => {
     try {
       const pc = await prisma.pc.delete({
            where: { id: parseInt(req.params.id) } // Supprime le pc par son ID
        });
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
    }
};

exports.getEditPc = async (req, res) => {
    try {
        const pc = await prisma.pc.findUnique({
            where: { id: parseInt(req.params.id) } // Récupère le pc par son ID
        });
         const employes = await prisma.employe.findMany({
            where: {
                chefId: req.session.chef.id,
                OR: [
                    { pc: null }, // Employés sans PC
                    { pc: { id: pc.id } } // Employé déjà associé à ce PC
                ]
            }
        });
        res.render('pages/addpc.twig', { pc, employes });
    } catch (error) {
        res.redirect('/');
    }
};

exports.postEditPc = async (req, res) => {
    try {
      const pc =  await prisma.pc.update({
            where: { id: parseInt(req.params.id) },
            data: {
                adresseMac: req.body.adresseMac,
                chefId: req.session.chef.id,
                employeId: req.body.employeId ? parseInt(req.body.employeId) : null // Associe le PC à un employé si sélectionné
            }
        });
        res.redirect('/');
    } catch (error) {
        const pc = await prisma.pc.findUnique({
            where: { id: parseInt(req.params.id) } // Récupère le pc par son ID
        });
         const employes = await prisma.employe.findMany({
            where: { chefId: req.session.chef.id, pc: null }
        });
        res.render('pages/addpc.twig', { pc, employes });
    }
};