import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Seeding database...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Seed admin password
    const adminPassword = await prisma.adminConfig.upsert({
        where: { key: 'admin_password' },
        update: {
            value: hashedPassword
        },
        create: {
            key: 'admin_password',
            value: hashedPassword,
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
