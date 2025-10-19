-- CreateTable
CREATE TABLE "MaestroDeOferta" (
    "id" TEXT NOT NULL,
    "periodoId" TEXT NOT NULL,
    "estudianteId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaestroDeOferta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfertaGrupoMateria" (
    "id" TEXT NOT NULL,
    "grupoMateriaId" TEXT NOT NULL,
    "maestroDeOfertaId" TEXT NOT NULL,
    "estaInscrita" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfertaGrupoMateria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfertaGrupoMateria_grupoMateriaId_maestroDeOfertaId_key" ON "OfertaGrupoMateria"("grupoMateriaId", "maestroDeOfertaId");
