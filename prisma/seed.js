const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: "খামারের মুরগির ডিম", slug: "farm-egg", description: "খাঁটি খামারের মুরগির ডিম, কোনো কৃত্রিম হরমোন ছাড়া।", price: 150, unit: "প্রতি ডজন", image: "/products/egg.jpg", stock: 100 },
    { name: "গরুর দুধ", slug: "cow-milk", description: "খাঁটি খামারের গরুর দুধ, কোনো ভেজাল নেই।", price: 90, unit: "প্রতি লিটার", image: "/products/milk.jpg", stock: 50 },
    { name: "খামারের মুরগি", slug: "farm-chicken", description: "খামারে পালন করা সুস্থ মুরগি।", price: 350, unit: "প্রতি কেজি", image: "/products/farm-chicken.jpg", stock: 30 },
    { name: "দেশি মুরগি", slug: "deshi-chicken", description: "খাঁটি দেশি মুরগি, স্বাদে ভরপুর।", price: 550, unit: "প্রতি কেজি", image: "/products/deshi-chicken.jpg", stock: 20 },
  ];

  for (const p of products) {
    await prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }

  // NOTE: Admin is intentionally NOT seeded here.
  // Create the admin account once with:  node scripts/create-admin.js
  // (keeps admin credentials out of .env, git, and logs)
  console.log("Products seeded. Create an admin with: node scripts/create-admin.js");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });