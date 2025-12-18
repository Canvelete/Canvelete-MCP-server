import fetch from 'node-fetch';

const API_KEY = 'cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195';
const API_URL = 'https://canvelete.com/api/designs';

async function listDesigns() {
    try {
        console.log('Fetching designs...');
        const response = await fetch(`${API_URL}?limit=50`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            return;
        }

        const data: any = await response.json();
        const designs = data.designs || data; // Handle likely response format

        if (Array.isArray(designs)) {
            console.log(`Found ${designs.length} designs:`);
            console.table(designs.map((d: any) => ({
                id: d.id,
                name: d.name,
                updatedAt: d.updatedAt
            })));
        } else {
            console.log('Response data:', JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error('Failed to fetch designs:', error);
    }
}

listDesigns();
