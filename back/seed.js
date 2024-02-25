import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();

// Calculer le chemin d'accès au fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'champions.json');

async function main() {
  const data = readFileSync(filePath, 'utf8');
  const championsData = JSON.parse(data);

  for (const champ of championsData) {
    await prisma.champion.create({
      data: champ,
    });
  }

  console.log(`${championsData.length} champions have been inserted.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
