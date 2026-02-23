import { prisma } from '../../src/lib/prisma.js';

async function syncCommunity() {
    console.log('🚀 Starting community sync...');

    try {
        const users = await prisma.user.findMany();
        console.log(`Found ${users.length} users in the database.`);

        let createdCount = 0;
        let updatedCount = 0;

        for (const user of users) {
            // Find community member by email (case insensitive if your DB supports it, but standard findFirst for now)
            const existingMember = await prisma.communityMember.findFirst({
                where: {
                    email: {
                        equals: user.email,
                        mode: 'insensitive'
                    }
                }
            });

            if (!existingMember) {
                console.log(`➕ Creating community member for: ${user.email}`);
                await prisma.communityMember.create({
                    data: {
                        name: user.name,
                        role: user.role,
                        email: user.email,
                        isActive: true
                    }
                });
                createdCount++;
            } else {
                // Ensure name stays in sync
                const nameNeedsSync = existingMember.name !== user.name;

                // Only sync role if the existing role is one of the standard ones
                const standardRoles = ['Admin', 'Volunteer', 'Donor', 'OrganisationLeader'];
                const roleNeedsSync = existingMember.role !== user.role && standardRoles.includes(existingMember.role);

                if (nameNeedsSync || roleNeedsSync) {
                    console.log(`🔄 Updating existing community member: ${user.email}`);
                    await prisma.communityMember.update({
                        where: { id: existingMember.id },
                        data: {
                            name: user.name,
                            ...(roleNeedsSync ? { role: user.role } : {})
                        }
                    });
                    updatedCount++;
                }
            }
        }

        console.log(`\n✨ Sync completed!`);
        console.log(`- Created: ${createdCount}`);
        console.log(`- Updated: ${updatedCount}`);
    } catch (error) {
        console.error('❌ Sync failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncCommunity();
