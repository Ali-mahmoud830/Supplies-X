const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes("import { prisma } from '@/lib/prisma'")) {
        c = c.replace(/import\s*\{\s*prisma\s*\}\s*from\s*'@\/lib\/prisma'/g, "import prisma from '@/lib/prisma'");
        fs.writeFileSync(p, c);
        console.log('Fixed:', p);
      }
    }
  });
}
walk('src');
