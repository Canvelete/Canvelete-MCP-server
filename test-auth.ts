#!/usr/bin/env npx tsx
/**
 * Test script to verify API key authentication works correctly
 * Supports both plain text (cvl_) and hashed (cvt_) API keys
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testAuth() {
    console.log('🔐 Testing API Key Authentication...\n');

    // Get the API key from environment or use a test key
    const testApiKey = process.env.CANVELETE_API_KEY || process.argv[2];
    
    if (!testApiKey) {
        console.error('❌ No API key provided. Usage:');
        console.error('   CANVELETE_API_KEY=your_key npx tsx test-auth.ts');
        console.error('   npx tsx test-auth.ts your_api_key');
        process.exit(1);
    }

    console.log(`Testing key: ${testApiKey.substring(0, 12)}...`);
    console.log(`Key prefix: ${testApiKey.substring(0, 4)}`);

    try {
        // Method 1: Try exact match (plain text keys)
        console.log('\n📋 Method 1: Exact key match...');
        let key = await prisma.apiKey.findUnique({
            where: { key: testApiKey },
            include: { user: true },
        });

        if (key) {
            console.log('✅ Found key via exact match (plain text key)');
            console.log(`   User: ${key.user.email}`);
            console.log(`   Status: ${key.status}`);
            return;
        }

        console.log('   Not found via exact match');

        // Method 2: Try bcrypt comparison (hashed keys)
        if (testApiKey.startsWith('cvt_')) {
            console.log('\n📋 Method 2: Bcrypt hash comparison...');
            const keyPrefix = testApiKey.substring(0, 12);
            console.log(`   Looking for keys with prefix: ${keyPrefix}`);

            const potentialKeys = await prisma.apiKey.findMany({
                where: {
                    keyPrefix: keyPrefix,
                    status: 'ACTIVE',
                },
                include: { user: true },
            });

            console.log(`   Found ${potentialKeys.length} potential keys`);

            for (const potentialKey of potentialKeys) {
                console.log(`   Checking key ID: ${potentialKey.id}`);
                try {
                    const isMatch = await bcrypt.compare(testApiKey, potentialKey.key);
                    if (isMatch) {
                        console.log('✅ Found key via bcrypt comparison (hashed key)');
                        console.log(`   User: ${potentialKey.user.email}`);
                        console.log(`   Status: ${potentialKey.status}`);
                        return;
                    }
                } catch (e) {
                    console.log(`   Key ${potentialKey.id} is not bcrypt hashed`);
                }
            }
        }

        // If we get here, the key wasn't found
        console.log('\n❌ API key not found in database');
        console.log('\nPossible issues:');
        console.log('1. The API key was never created');
        console.log('2. The API key has been revoked or deleted');
        console.log('3. The key prefix in the database doesn\'t match');

        // Show existing keys for debugging
        console.log('\n📊 Existing API keys in database:');
        const allKeys = await prisma.apiKey.findMany({
            select: {
                id: true,
                name: true,
                keyPrefix: true,
                status: true,
                user: { select: { email: true } },
            },
            take: 10,
        });

        if (allKeys.length === 0) {
            console.log('   No API keys found in database');
        } else {
            for (const k of allKeys) {
                console.log(`   - ${k.name} (${k.keyPrefix}...) - ${k.status} - ${k.user.email}`);
            }
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testAuth();
