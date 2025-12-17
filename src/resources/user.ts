// Resources stub - API-based implementation would require /api/user endpoint
import type { AuthContext } from '../auth.js';

export async function getUserProfileResource(auth: AuthContext) {
    // Note: This requires a /api/user or /api/user/profile endpoint
    // For now, return stub
    return {
        uri: 'canvelete://api/user/profile',
        mimeType: 'application/json',
        text: JSON.stringify({
            message: 'User profile endpoint not yet implemented in API',
            note: 'Contact Canvelete support to enable this feature',
        }, null, 2),
    };
}

export async function getUserPreferencesResource(auth: AuthContext) {
    // Note: This requires a /api/user/preferences endpoint
    return {
        uri: 'canvelete://api/user/preferences',
        mimeType: 'application/json',
        text: JSON.stringify({
            message: 'User preferences endpoint not yet implemented in API',
            note: 'Contact Canvelete support to enable this feature',
        }, null, 2),
    };
}
