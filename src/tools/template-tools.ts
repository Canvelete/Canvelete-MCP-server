// Template tools for MCP server
import type { AuthContext } from '../auth.js';
import { validateInput } from '../utils/validation.js';
import { logger } from '../utils/logger.js';
import {
    ListTemplatesSchema,
    ApplyTemplateSchema,
    type ListTemplatesInput,
    type ApplyTemplateInput,
} from '../types/index.js';

/**
 * List available templates
 */
export async function listTemplates(input: ListTemplatesInput) {
    const data = validateInput(ListTemplatesSchema, input);

    // Stub: Need to create API Client method for templates
    // For now, we'll use a workaround via the designs API
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';

    try {
        const params = new URLSearchParams({
            page: (data.page ?? 1).toString(),
            limit: (data.limit ?? 20).toString(),
            isTemplate: 'true',
        });

        if (data.category) {
            params.append('category', data.category);
        }

        const response = await fetch(`${baseUrl}/api/templates?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Templates API returned ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        logger.error('Failed to fetch templates', error);
        throw new Error(`Failed to list templates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Apply a template to an existing design
 */
export async function applyTemplate(auth: AuthContext, input: ApplyTemplateInput) {
    const data = validateInput(ApplyTemplateSchema, input);

    // Fetch the template design
    const template = await auth.apiClient.getDesign(data.templateId);

    if (!template.isTemplate) {
        throw new Error('The specified design is not a template');
    }

    // Apply template canvas data to design
    await auth.apiClient.updateDesign(data.designId, {
        canvasData: template.canvasData,
        width: template.width,
        height: template.height,
    });

    return {
        success: true,
        designId: data.designId,
        templateId: template.id,
        message: 'Template applied successfully',
    };
}

/**
 * Create a template from a design
 */
export async function createTemplate(
    auth: AuthContext,
    designId: string,
    name: string,
    category?: string,
    tags?: string[]
) {
    // Fetch the source design
    const design = await auth.apiClient.getDesign(designId);

    // Create a duplicate as a template
    const template = await auth.apiClient.createDesign({
        name,
        description: design.description,
        width: design.width,
        height: design.height,
        canvasData: design.canvasData,
        visibility: 'PRIVATE',
        // Note: The API may not support these fields directly
        // This is a stub implementation
    });

    return {
        id: template.id,
        name: template.name,
        message: 'Template created successfully. Contact support to set as public template.',
    };
}
