// copy-db.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = join(__dirname, 'prisma', 'dev.db'); // Adjust the path as needed
const outputPath = join(
  __dirname,
  '.output',
  'server',
  'node_modules',
  '.prisma',
  'client',
  'dev.db'
);

async function copyDatabase() {
  try {
    await fs.copyFile(sourcePath, outputPath);
    console.log('Database file copied to .output/.../.prisma');
  } catch (err) {
    console.error('Error copying database file:', err);
  }
}

copyDatabase();
