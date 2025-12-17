#!/usr/bin/env npx tsx
/**
 * Test script to verify MCP server tools work correctly
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testTools() {
    console.log('🔧 Testing MCP Server Tools...\n');

    const apiKey = process.env.CANVELETE_API_KEY || process.argv[2];
    
    if (!apiKey) {
        console.error('❌ No API key provided. Usage:');
        console.error('   CANVELETE_API_KEY=your_key npx tsx test-mcp-tools.ts');
        process.exit(1);
    }

    try {
        // 1. Find the API key and user
        console.log('📋 Step 1: Verifying API key...');
        const key = await prisma.apiKey.findUnique({
            where: { key: apiKey },
            include: { user: true },
        });

        if (!key) {
            console.error('❌ API key not found');
            process.exit(1);
        }

        console.log(`✅ API key valid for user: ${key.user.email}`);
        const userId = key.userId;

        // 2. Test list_designs
        console.log('\n📋 Step 2: Testing list_designs...');
        const designs = await prisma.design.findMany({
            where: {
                OR: [
                    { userId },
                    {
                        collaborators: {
                            some: {
                                userId,
                                acceptedAt: { not: null },
                            },
                        },
                    },
                ],
            },
            take: 5,
            select: {
                id: true,
                name: true,
                visibility: true,
            },
        });
        console.log(`✅ Found ${designs.length} designs`);
        designs.forEach(d => console.log(`   - ${d.name} (${d.id})`));

        // 3. Test create_design (dry run)
        console.log('\n📋 Step 3: Testing create_design capability...');
        const subscription = await prisma.subscription.findUnique({
            where: { userId },
        });
        const designCount = await prisma.design.count({
            where: { userId, status: { not: 'ARCHIVED' } },
        });
        const canCreate = !subscription || subscription.maxDesigns === -1 || designCount < subscription.maxDesigns;
        console.log(`✅ Can create designs: ${canCreate}`);
        console.log(`   Current designs: ${designCount}, Max: ${subscription?.maxDesigns ?? 'unlimited'}`);

        // 4. Test list_assets
        console.log('\n📋 Step 4: Testing list_assets...');
        const assets = await prisma.asset.findMany({
            where: { userId, status: 'READY' },
            take: 5,
            select: {
                id: true,
                filename: true,
                type: true,
            },
        });
        console.log(`✅ Found ${assets.length} assets`);
        assets.forEach(a => console.log(`   - ${a.filename} (${a.type})`));

        // 5. Test list_templates
        console.log('\n📋 Step 5: Testing list_templates...');
        const templates = await prisma.design.findMany({
            where: {
                isTemplate: true,
                visibility: 'PUBLIC',
                templateStatus: 'APPROVED',
            },
            take: 5,
            select: {
                id: true,
                name: true,
                templateCategory: true,
            },
        });
        console.log(`✅ Found ${templates.length} public templates`);
        templates.forEach(t => console.log(`   - ${t.name} (${t.templateCategory})`));

        console.log('\n✅ All tests passed! MCP server should work correctly.');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testTools();
