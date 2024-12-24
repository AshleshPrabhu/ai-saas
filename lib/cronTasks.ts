// lib/cronTasks.js
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Cron job to run at 12 PM and 12 AM daily
cron.schedule('0 0,12 * * *', async () => {
console.log('Running cron job to check for expired plans...');

// Call your function to check and update user plans
await checkAndUpdatePremiumValidity(prisma);
});

// Function to check and update premium validity for all users
export const checkAndUpdatePremiumValidity = async (prisma:any) => {
console.log('Checking for expired plans and updating users...');

try {
    const users = await prisma.user.findMany({
    include: {
        order: {
        orderBy: {
            expiresAt: 'desc',
        },
        take: 1,
        },
    },
    });

    for (const user of users) {
    const latestOrder = user.order[0];

    if (!latestOrder) {
        console.log(`No orders found for user ${user.id}. Skipping...`);
        continue;
    }

    const currentTime = new Date();
    if (new Date(latestOrder.expiresAt) < currentTime) {
        console.log(`Order for user ${user.id} has expired. Updating...`);

        // Update order and user to free plan
        await prisma.order.update({
        where: { id: latestOrder.id },
        data: {
            plan: 'free',
            expiresAt: currentTime,
        },
        });

        await prisma.user.update({
        where: { id: user.id },
        data: {
            isPaid: false,
        },
        });

        console.log(`User ${user.id} updated to free plan.`);
    } else {
        console.log(`Order for user ${user.id} is still valid.`);
    }
    }

    console.log('Premium validity check completed.');
} catch (error) {
    console.error('Error checking and updating premium validity:', error);
}
};
