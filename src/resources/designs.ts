// Resources stub - refactored for API
import type { AuthContext } from '../auth.js';

export async function getDesignResource(auth: AuthContext, designId: string) {
    const design = await auth.apiClient.getDesign(designId);
    return {
        uri: `canvelete://api/design/${designId}`,
        mimeType: 'application/json',
        text: JSON.stringify(design, null, 2),
    };
}

export async function listDesignsResource(auth: AuthContext) {
    const result = await auth.apiClient.listDesigns();
    return {
        uri: 'canvelete://api/designs/list',
        mimeType: 'application/json',
        text: JSON.stringify(result, null, 2),
    };
}

export async function listTemplatesResource() {
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';
    const response = await fetch(`${baseUrl}/api/templates?limit=50`);
    const templates = await response.json();
    return {
        uri: 'canvelete://api/designs/templates',
        mimeType: 'application/json',
        text: JSON.stringify(templates, null, 2),
    };
}
