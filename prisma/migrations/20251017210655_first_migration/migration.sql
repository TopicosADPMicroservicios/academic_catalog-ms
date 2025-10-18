-- CreateTable
CREATE TABLE "Nivel" (
    "id" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDeEstudio" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "carreraId" TEXT NOT NULL,
    "estaActivo" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanDeEstudio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "esElectiva" BOOLEAN NOT NULL DEFAULT false,
    "estaActiva" BOOLEAN NOT NULL DEFAULT true,
    "nivelId" TEXT NOT NULL,
    "planDeEstudioId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prerequisito" (
    "id" TEXT NOT NULL,
    "siglaMateria" TEXT NOT NULL,
    "siglaPrerequisito" TEXT NOT NULL,
    "esActivo" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prerequisito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_codigo_key" ON "Carrera"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_sigla_key" ON "Materia"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Prerequisito_siglaMateria_siglaPrerequisito_key" ON "Prerequisito"("siglaMateria", "siglaPrerequisito");

-- AddForeignKey
ALTER TABLE "PlanDeEstudio" ADD CONSTRAINT "PlanDeEstudio_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_nivelId_fkey" FOREIGN KEY ("nivelId") REFERENCES "Nivel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_planDeEstudioId_fkey" FOREIGN KEY ("planDeEstudioId") REFERENCES "PlanDeEstudio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prerequisito" ADD CONSTRAINT "Prerequisito_siglaMateria_fkey" FOREIGN KEY ("siglaMateria") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prerequisito" ADD CONSTRAINT "Prerequisito_siglaPrerequisito_fkey" FOREIGN KEY ("siglaPrerequisito") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
