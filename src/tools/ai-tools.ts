// AI tools stub - requires Civi AI API integration
import type { AuthContext } from '../auth.js';

export async function generateDesign(auth: AuthContext, prompt: string, style?: string) {
    // Note: This requires integration with Civi AI API
    return {
        message: 'AI design generation not yet implemented via API',
        note: 'This feature requires direct API access to Civi AI. Contact support.',
    };
}

export async function chatWithCivi(auth: AuthContext, message: string, designId?: string) {
    // Note: This requires integration with Civi AI API
    return {
        message: 'Civi AI chat not yet implemented via API',
        note: 'This feature requires direct API access to Civi AI. Contact support.',
    };
}
