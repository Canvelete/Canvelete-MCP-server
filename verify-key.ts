import { PrismaClient } from '@prisma/client';

// Use the connection string from the root .env
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:123@localhost:5432/canvelete?schema=public"
        }
    }
});

async function setupKey() {
    const apiKey = "cvt_a5c514564c4b08b2778fc8586fffd8df6a5a6391a9cbfe89adedcaf01427b73a";
    console.log('Setting up API Key:', apiKey);

    try {
        // 1. Find a user
        const user = await prisma.user.findFirst();
        if (!user) {
            console.error('❌ No users found in database. Cannot create API key.');
            return;
        }
        console.log('Found user:', user.email, user.id);

        // 2. Check if key exists
        const existingKey = await prisma.apiKey.findUnique({
            where: { key: apiKey }
        });

        if (existingKey) {
            console.log('✅ Key already exists (plain text match).');
            return;
        }

        // 3. Create the key (Plain text for MCP compatibility)
        // We use the first 7 chars as prefix based on the input
        const prefix = apiKey.substring(0, 7);

        await prisma.apiKey.create({
            data: {
                name: 'MCP Server Key',
                key: apiKey, // Storing plain text to match auth.ts logic
                keyPrefix: prefix,
                userId: user.id,
                status: 'ACTIVE',
                scopes: ['*']
            }
        });

        console.log('✅ Created plain text API key for MCP server!');

    } catch (error) {
        console.error('Error setting up key:', error);
    } finally {
        await prisma.$disconnect();
    }
}

setupKey();
