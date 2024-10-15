/*
  Warnings:

  - Added the required column `idSubcategoria` to the `CompradorProducto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSubcategoria` to the `Inventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSubcategoria` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSubcategoria` to the `ProductoInteres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSubcategoria` to the `VendedorProducto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompradorProducto" ADD COLUMN     "idSubcategoria" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Inventario" ADD COLUMN     "idSubcategoria" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "idSubcategoria" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductoInteres" ADD COLUMN     "idSubcategoria" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VendedorProducto" ADD COLUMN     "idSubcategoria" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Subcategoria" (
    "idSubcategoria" SERIAL NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcategoria_pkey" PRIMARY KEY ("idSubcategoria")
);

-- AddForeignKey
ALTER TABLE "Subcategoria" ADD CONSTRAINT "Subcategoria_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendedorProducto" ADD CONSTRAINT "VendedorProducto_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompradorProducto" ADD CONSTRAINT "CompradorProducto_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoInteres" ADD CONSTRAINT "ProductoInteres_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_idSubcategoria_fkey" FOREIGN KEY ("idSubcategoria") REFERENCES "Subcategoria"("idSubcategoria") ON DELETE RESTRICT ON UPDATE CASCADE;
