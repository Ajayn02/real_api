const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

async function main() {

    // Insert admin data
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('123', saltRounds);

    await prisma.user.create({
        data: { name: 'admin', email: 'admin@gmail.com', role: 'admin', password: hashedPassword }
    });
    console.log('🌱 Seed completed');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(() => prisma.$disconnect());