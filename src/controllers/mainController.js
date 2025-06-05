const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient()

exports.getHome = async (req, res) => {
    try {
        const chef = await prisma.chef.findUnique({
            where: { id: req.session.chef.id },
            include: {
                pcs: {
                    include: { employe: true } // Inclut les employés associés aux PCs
                },
                employes: true // Inclut les employés du chef
            }
        });
        res.render('pages/home.twig', { chef });
    } catch (error) {
        res.render('pages/home.twig', { chef: req.session.chef });
    }
}
