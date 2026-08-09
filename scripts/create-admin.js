// One-time admin creation / password reset.
// Credentials are typed interactively (masked) and stored only as a bcrypt hash.
// Nothing is written to .env, git, or logs.
//
// Usage (inside the running container):
//   docker compose exec app node scripts/create-admin.js
//   docker compose exec app node scripts/create-admin.js admin@example.com   # email as arg
//
// Re-running with an existing email just updates that admin's password.

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const prisma = new PrismaClient();

function ask(query, { mask = false } = {}) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl._writeToOutput = (str) => rl.output.write(rl.stdoutMuted ? "*" : str);
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      if (mask) process.stdout.write("\n");
      resolve(answer.trim());
    });
    rl.stdoutMuted = mask; // mute AFTER the prompt itself is printed
  });
}

async function main() {
  const email = process.argv[2] || (await ask("Admin email: "));
  const password = await ask("Admin password (min 8 chars): ", { mask: true });
  const confirm = await ask("Confirm password: ", { mask: true });

  if (!email || !password) {
    console.error("❌ Email and password are required.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("❌ Password must be at least 8 characters.");
    process.exit(1);
  }
  if (password !== confirm) {
    console.error("❌ Passwords do not match.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed, name: "Admin" },
  });

  console.log(`\n✅ Admin ready: ${admin.email}  (password stored hashed — not shown anywhere).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
