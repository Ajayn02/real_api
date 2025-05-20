const { PrismaClient } = require('@prisma/client')

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

prisma.$connect()
    .then(() => console.log('Database connected'))
    .catch((error) => {
        console.error('❌ Failed to connect to the database:', error);
    });

module.exports = prisma;