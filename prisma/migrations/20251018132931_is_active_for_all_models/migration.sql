/*
  Warnings:

  - You are about to drop the column `estaActivo` on the `Carrera` table. All the data in the column will be lost.
  - You are about to drop the column `estaActiva` on the `Materia` table. All the data in the column will be lost.
  - You are about to drop the column `estaActivo` on the `PlanDeEstudio` table. All the data in the column will be lost.
  - You are about to drop the column `esActivo` on the `Prerequisito` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carrera" DROP COLUMN "estaActivo",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Materia" DROP COLUMN "estaActiva",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "PlanDeEstudio" DROP COLUMN "estaActivo",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Prerequisito" DROP COLUMN "esActivo",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
