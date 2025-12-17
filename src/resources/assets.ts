// Resources stub - refactored for API
import type { AuthContext } from '../auth.js';
import { listFonts } from '../tools/asset-tools.js';

export async function getAssetsLibraryResource(auth: AuthContext) {
    const assets = await auth.apiClient.listAssets();
    return {
        uri: 'canvelete://api/assets/library',
        mimeType: 'application/json',
        text: JSON.stringify(assets, null, 2),
    };
}

export async function getFontsResource() {
    const fonts = await listFonts();
    return {
        uri: 'canvelete://api/assets/fonts',
        mimeType: 'application/json',
        text: JSON.stringify(fonts, null, 2),
    };
}
