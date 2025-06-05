-- CreateTable
CREATE TABLE `Chef` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `raisonSociale` VARCHAR(191) NOT NULL,
    `siret` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Chef_siret_key`(`siret`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `chefId` INTEGER NOT NULL,

    UNIQUE INDEX `Employe_mail_key`(`mail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adresseMac` VARCHAR(191) NOT NULL,
    `chefId` INTEGER NULL,
    `employeId` INTEGER NULL,

    UNIQUE INDEX `Pc_adresseMac_key`(`adresseMac`),
    UNIQUE INDEX `Pc_employeId_key`(`employeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employe` ADD CONSTRAINT `Employe_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `Chef`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pc` ADD CONSTRAINT `Pc_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `Chef`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pc` ADD CONSTRAINT `Pc_employeId_fkey` FOREIGN KEY (`employeId`) REFERENCES `Employe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
