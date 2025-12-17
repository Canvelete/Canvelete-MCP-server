// Resources stub - refactored for API
import type { AuthContext } from '../auth.js';

export async function getCanvasResource(auth: AuthContext, designId: string) {
    const design = await auth.apiClient.getDesign(designId);
    return {
        uri: `canvelete://api/canvas/${designId}`,
        mimeType: 'application/json',
        text: JSON.stringify(design.canvasData || {}, null, 2),
    };
}

export async function getCanvasElementsResource(auth: AuthContext, designId: string) {
    const design = await auth.apiClient.getDesign(designId);
    const canvasData = design.canvasData as any;
    return {
        uri: `canvelete://api/canvas/${designId}/elements`,
        mimeType: 'application/json',
        text: JSON.stringify(canvasData?.elements || [], null, 2),
    };
}
