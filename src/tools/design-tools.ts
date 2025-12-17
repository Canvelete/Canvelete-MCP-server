// Design management tools for MCP server
import type { AuthContext } from '../auth.js';
import { validateInput } from '../utils/validation.js';
import {
    CreateDesignSchema,
    UpdateDesignSchema,
    ExportDesignSchema,
    type CreateDesignInput,
    type UpdateDesignInput,
    type ExportDesignInput,
} from '../types/index.js';

/**
 * Get a single design by ID
 */
export async function getDesign(auth: AuthContext, designId: string) {
    return auth.apiClient.getDesign(designId);
}

/**
 * List designs
 */
export async function listDesigns(auth: AuthContext, page: number = 1, limit: number = 20, search?: string) {
    return auth.apiClient.listDesigns(page, limit, search);
}

/**
 * Create a new design
 */
export async function createDesign(auth: AuthContext, input: CreateDesignInput) {
    const data = validateInput(CreateDesignSchema, input);
    return auth.apiClient.createDesign({
        ...data,
        canvasData: {
            elements: [],
            canvasMode: 'freeform',
        },
    });
}

/**
 * Update a design
 */
export async function updateDesign(auth: AuthContext, input: UpdateDesignInput) {
    const data = validateInput(UpdateDesignSchema, input);

    // API endpoint expects "designId" in the path, and the rest in the body
    const { designId, ...updateData } = data;

    return auth.apiClient.updateDesign(designId, updateData);
}

/**
 * Delete a design
 */
export async function deleteDesign(auth: AuthContext, designId: string) {
    return auth.apiClient.deleteDesign(designId);
}

/**
 * Duplicate a design
 */
export async function duplicateDesign(auth: AuthContext, designId: string, newName?: string) {
    return auth.apiClient.duplicateDesign(designId, newName);
}

/**
 * Export a design
 */
export async function exportDesign(auth: AuthContext, input: ExportDesignInput) {
    const data = validateInput(ExportDesignSchema, input);

    // We need to fetch the design first to check existence/permissions
    // (Although the client could just construct the URL, validating first is better UX)
    try {
        await auth.apiClient.getDesign(data.designId);
    } catch (e) {
        throw new Error(`Failed to access design: ${e}`);
    }

    // Return the API endpoint for export
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';
    const exportUrl = `${baseUrl}/api/designs/${data.designId}/export?format=${data.format}&quality=${data.quality}`;

    return {
        designId: data.designId,
        format: data.format,
        exportUrl,
        message: 'Use this URL to download the exported design with authentication',
    };
}
