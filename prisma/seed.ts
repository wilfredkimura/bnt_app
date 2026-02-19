import { prisma } from '../src/lib/prisma';

async function main() {
    console.log('Seeding database...');

    // Seed admin password
    const adminPassword = await prisma.adminConfig.upsert({
        where: { key: 'admin_password' },
        update: {},
        create: {
            key: 'admin_password',
            value: 'admin123', // TODO: Hash this in production
        },
    });

    console.log('✅ Admin password seeded:', adminPassword.key);
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
