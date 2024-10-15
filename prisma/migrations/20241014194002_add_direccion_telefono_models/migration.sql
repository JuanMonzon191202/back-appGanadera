/*
  Warnings:

  - You are about to drop the column `direccion` on the `Direccion` table. All the data in the column will be lost.
  - You are about to drop the column `numeroTelefono` on the `Telefono` table. All the data in the column will be lost.
  - Added the required column `calle` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciudad` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigoPostal` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pais` to the `Direccion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Telefono` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Telefono` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direccion" DROP COLUMN "direccion",
ADD COLUMN     "calle" TEXT NOT NULL,
ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "codigoPostal" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "pais" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Telefono" DROP COLUMN "numeroTelefono",
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;
