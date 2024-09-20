-- CreateEnum
CREATE TYPE "TipoReaccion" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "UnidadMedida" AS ENUM ('TONELADA', 'UNIDADES');

-- CreateEnum
CREATE TYPE "TipoOrden" AS ENUM ('COMPRA', 'VENTA');

-- CreateEnum
CREATE TYPE "EstadoOrden" AS ENUM ('PENDIENTE', 'EXITOSO', 'FALLIDO', 'CANCELADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "idTipoUsuario" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "nombreEmpresa" TEXT,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "infoEmpresa" TEXT,
    "verificado" BOOLEAN NOT NULL,
    "fotoPerfil" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Like" (
    "iLike" SERIAL NOT NULL,
    "idUsuarioEmisor" INTEGER NOT NULL,
    "idUsuarioReceptor" INTEGER NOT NULL,
    "tipoReaccion" "TipoReaccion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("iLike")
);

-- CreateTable
CREATE TABLE "Telefono" (
    "idTelefono" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Telefono_pkey" PRIMARY KEY ("idTelefono")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "idDireccion" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("idDireccion")
);

-- CreateTable
CREATE TABLE "Producto" (
    "idProducto" SERIAL NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("idProducto")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "idCategoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("idCategoria")
);

-- CreateTable
CREATE TABLE "VendedorProducto" (
    "idVendedorProducto" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "precioxTN" DECIMAL(10,2) NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "statusEmpresa" TEXT NOT NULL,
    "cantidadDisponible" TEXT NOT NULL,
    "descripcion" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendedorProducto_pkey" PRIMARY KEY ("idVendedorProducto")
);

-- CreateTable
CREATE TABLE "CompradorProducto" (
    "idCompradorProducto" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidadRequerida" DECIMAL(10,2) NOT NULL,
    "precioMax" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompradorProducto_pkey" PRIMARY KEY ("idCompradorProducto")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "idInventario" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,
    "unidadMedida" "UnidadMedida" NOT NULL,
    "costoxUnidad" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("idInventario")
);

-- CreateTable
CREATE TABLE "ProductoInteres" (
    "idInteres" SERIAL NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "precioMax" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductoInteres_pkey" PRIMARY KEY ("idInteres")
);

-- CreateTable
CREATE TABLE "Orden" (
    "idOrden" SERIAL NOT NULL,
    "idComprador" INTEGER NOT NULL,
    "idVendedor" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "tipoOrden" "TipoOrden" NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "status" "EstadoOrden" NOT NULL,
    "fechaAcordada" TEXT NOT NULL,
    "descripcion" TEXT,
    "fotoProducto" TEXT,
    "direccion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("idOrden")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idUsuarioEmisor_fkey" FOREIGN KEY ("idUsuarioEmisor") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_idUsuarioReceptor_fkey" FOREIGN KEY ("idUsuarioReceptor") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefono" ADD CONSTRAINT "Telefono_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendedorProducto" ADD CONSTRAINT "VendedorProducto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendedorProducto" ADD CONSTRAINT "VendedorProducto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompradorProducto" ADD CONSTRAINT "CompradorProducto_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompradorProducto" ADD CONSTRAINT "CompradorProducto_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoInteres" ADD CONSTRAINT "ProductoInteres_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoInteres" ADD CONSTRAINT "ProductoInteres_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_idComprador_fkey" FOREIGN KEY ("idComprador") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_idVendedor_fkey" FOREIGN KEY ("idVendedor") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;
