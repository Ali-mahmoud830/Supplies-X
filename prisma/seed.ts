import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Categories
  const category1 = await prisma.category.upsert({
    where: { slug: 'industrial-tools' },
    update: {},
    create: {
      name_en: 'Industrial Tools',
      name_ar: 'أدوات صناعية',
      slug: 'industrial-tools',
      icon: 'Hammer',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { slug: 'safety-equipment' },
    update: {},
    create: {
      name_en: 'Safety Equipment',
      name_ar: 'معدات السلامة',
      slug: 'safety-equipment',
      icon: 'Shield',
    },
  });

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      title_en: 'Heavy Duty Impact Drill',
      title_ar: 'مثقاب شديد التحمل',
      desc_en: 'Professional grade impact drill for concrete and metal.',
      desc_ar: 'مثقاب احترافي للخرسانة والمعادن.',
      categoryId: category1.id,
      brand: 'ProDrill',
      origin: 'Germany',
      images: ['/images/drill.jpg'],
      specifications: {
        power: '800W',
        rpm: '0-3000',
        weight: '2.5kg'
      }
    }
  });

  const product2 = await prisma.product.create({
    data: {
      title_en: 'Reflective Safety Vest',
      title_ar: 'سترة سلامة عاكسة',
      desc_en: 'High visibility vest for construction workers.',
      desc_ar: 'سترة عالية الوضوح لعمال البناء.',
      categoryId: category2.id,
      brand: 'SafeGear',
      origin: 'USA',
      images: ['/images/vest.jpg'],
      specifications: {
        material: 'Polyester',
        color: 'Neon Yellow',
        size: 'Universal'
      }
    }
  });

  // Create an RFQ
  const rfq = await prisma.rFQ.create({
    data: {
      client_name: 'Ahmed Ali',
      company_name: 'BuildTech LLC',
      email: 'ahmed@buildtech.com',
      phone: '+971501234567',
      status: 'Pending',
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 10
          },
          {
            productId: product2.id,
            quantity: 50
          }
        ]
      }
    }
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
