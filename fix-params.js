const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.ts') || p.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('{ params }: { params: { id: string } }')) {
        c = c.replace(
          /export async function (\w+)\(request: Request, \{ params \}: \{ params: \{ id: string \} \}\) \{/g,
          "export async function $1(request: Request, props: { params: Promise<{ id: string }> }) {\n  const params = await props.params;"
        );
        fs.writeFileSync(p, c);
        console.log('Fixed:', p);
      }
    }
  });
}
walk('src/app/api');
