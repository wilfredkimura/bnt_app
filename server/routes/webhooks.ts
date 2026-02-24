import { Router } from 'express';
import { Webhook } from 'svix';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';

router.post('/clerk', async (req, res) => {
    if (!WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SECRET is not defined');
        return res.status(500).send('Webhook secret missing');
    }

    const headers = req.headers;
    const payload = JSON.stringify(req.body);

    const svix_id = headers['svix-id'] as string;
    const svix_timestamp = headers['svix-timestamp'] as string;
    const svix_signature = headers['svix-signature'] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).send('Missing svix headers');
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: any;

    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Webhook verification failed:', err);
        return res.status(400).send('Verification failed');
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Received webhook: ${eventType} for ${id}`);

    try {
        if (eventType === 'user.created' || eventType === 'user.updated') {
            const { first_name, last_name, email_addresses, image_url } = evt.data;
            const email = email_addresses[0].email_address;
            const name = `${first_name || ''} ${last_name || ''}`.trim() || email.split('@')[0];

            await prisma.$transaction(async (tx) => {
                // Upsert User
                const user = await tx.user.upsert({
                    where: { email },
                    update: {
                        clerkId: id,
                        name,
                    },
                    create: {
                        clerkId: id,
                        email,
                        name,
                        password: '', // Clerk handles auth
                        role: 'Volunteer',
                    },
                });

                // Upsert CommunityMember
                await tx.communityMember.upsert({
                    where: { email },
                    update: {
                        name,
                        photoUrl: image_url,
                    },
                    create: {
                        name,
                        email,
                        photoUrl: image_url,
                        role: user.role,
                        isActive: true,
                    },
                });
            });
        }

        if (eventType === 'user.deleted') {
            await prisma.user.update({
                where: { clerkId: id },
                data: { clerkId: null }, // Or delete if preferred
            });
        }

        res.status(200).send('Webhook handled successfully');
    } catch (err) {
        console.error('Database sync failed:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
