// Canvas manipulation tools for MCP server
import type { AuthContext } from '../auth.js';
import { validateInput } from '../utils/validation.js';
import {
    AddElementSchema,
    UpdateElementSchema,
    DeleteElementSchema,
    ResizeCanvasSchema,
    type AddElementInput,
    type UpdateElementInput,
    type DeleteElementInput,
    type ResizeCanvasInput,
} from '../types/index.js';
import { nanoid } from 'nanoid';
import { wsNotifier } from '../utils/ws-notify.js';

/**
 * Normalize element properties to ensure correct types and defaults
 */
function normalizeElement(element: any): any {
    const normalized = { ...element };

    // Ensure numeric properties are numbers
    const numericProps = [
        'x', 'y', 'width', 'height', 'rotation', 'opacity',
        'strokeWidth', 'borderRadius', 'fontSize', 'letterSpacing', 'lineHeight',
        'blur', 'brightness', 'contrast', 'saturate', 'hueRotate',
        'polygonSides', 'starPoints', 'starInnerRadius',
        'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomLeft', 'borderRadiusBottomRight',
        'textShadowX', 'textShadowY', 'textShadowBlur', 'textStrokeWidth',
        'tableRows', 'tableColumns', 'tableCellFontSize', 'tableBorderWidth', 'tableCellPadding',
    ];

    for (const prop of numericProps) {
        if (normalized[prop] !== undefined && normalized[prop] !== null) {
            normalized[prop] = Number(normalized[prop]);
        }
    }

    // Set defaults for required properties
    if (normalized.rotation === undefined) normalized.rotation = 0;
    if (normalized.opacity === undefined) normalized.opacity = 1;
    if (normalized.visible === undefined) normalized.visible = true;
    if (normalized.locked === undefined) normalized.locked = false;

    // Ensure x and y are valid (default to 0 if not provided or NaN)
    if (typeof normalized.x !== 'number' || isNaN(normalized.x)) normalized.x = 0;
    if (typeof normalized.y !== 'number' || isNaN(normalized.y)) normalized.y = 0;

    // Ensure width and height have minimum values
    if (typeof normalized.width !== 'number' || isNaN(normalized.width) || normalized.width < 1) {
        normalized.width = 100;
    }
    if (typeof normalized.height !== 'number' || isNaN(normalized.height) || normalized.height < 1) {
        normalized.height = 100;
    }

    return normalized;
}

/**
 * Add an element to the canvas
 */
export async function addElement(auth: AuthContext, input: AddElementInput) {
    const data = validateInput(AddElementSchema, input);

    // Fetch the design
    const design = await auth.apiClient.getDesign(data.designId);

    const canvasData = design.canvasData as any;
    const elements = canvasData.elements || [];

    // Normalize the element properties
    const normalizedElement = normalizeElement(data.element);

    // Generate element ID
    const elementId = nanoid();

    // Create new element with generated ID and normalized properties
    const newElement = {
        id: elementId,
        ...normalizedElement,
        name: normalizedElement.name || `${normalizedElement.type} ${elements.length + 1}`,
        createdAt: new Date().toISOString(),
    };

    elements.push(newElement);

    // Update design with new canvasData
    const updatedCanvasData = {
        ...canvasData,
        elements,
    };

    await auth.apiClient.updateDesign(data.designId, {
        canvasData: updatedCanvasData,
    });

    // Notify WebSocket clients about the new element
    await wsNotifier.notifyElementAdded(data.designId, newElement);

    return {
        success: true,
        elementId: newElement.id,
        element: newElement,
        message: `Element "${newElement.name}" added at position (${newElement.x}, ${newElement.y}) with size ${newElement.width}x${newElement.height}`,
    };
}

/**
 * Update an element on the canvas
 */
export async function updateElement(auth: AuthContext, input: UpdateElementInput) {
    const data = validateInput(UpdateElementSchema, input);

    // Fetch the design
    const design = await auth.apiClient.getDesign(data.designId);

    const canvasData = design.canvasData as any;
    const elements = canvasData.elements || [];

    // Find and update element
    const elementIndex = elements.findIndex((el: any) => el.id === data.elementId);
    if (elementIndex === -1) {
        throw new Error('Element not found');
    }

    // Normalize the updates
    const normalizedUpdates = normalizeElement({ ...elements[elementIndex], ...data.updates });

    elements[elementIndex] = {
        ...normalizedUpdates,
        id: data.elementId, // Preserve the original ID
        updatedAt: new Date().toISOString(),
    };

    // Update design with new canvasData
    const updatedCanvasData = {
        ...canvasData,
        elements,
    };

    await auth.apiClient.updateDesign(data.designId, {
        canvasData: updatedCanvasData,
    });

    // Notify WebSocket clients about the element update
    await wsNotifier.notifyElementUpdated(data.designId, data.elementId, data.updates);

    return {
        success: true,
        elementId: data.elementId,
        element: elements[elementIndex],
        message: `Element updated successfully`,
    };
}

/**
 * Delete an element from the canvas
 */
export async function deleteElement(auth: AuthContext, input: DeleteElementInput) {
    const data = validateInput(DeleteElementSchema, input);

    // Fetch the design
    const design = await auth.apiClient.getDesign(data.designId);

    const canvasData = design.canvasData as any;
    const elements = canvasData.elements || [];

    // Find the element to get its name before deleting
    const elementToDelete = elements.find((el: any) => el.id === data.elementId);
    if (!elementToDelete) {
        throw new Error('Element not found');
    }

    // Remove element
    const filteredElements = elements.filter((el: any) => el.id !== data.elementId);

    // Update design with new canvasData
    const updatedCanvasData = {
        ...canvasData,
        elements: filteredElements,
    };

    await auth.apiClient.updateDesign(data.designId, {
        canvasData: updatedCanvasData,
    });

    // Notify WebSocket clients about the element deletion
    await wsNotifier.notifyElementDeleted(data.designId, data.elementId);

    return {
        success: true,
        message: `Element "${elementToDelete.name || data.elementId}" deleted successfully`,
    };
}

/**
 * Resize the canvas
 */
export async function resizeCanvas(auth: AuthContext, input: ResizeCanvasInput) {
    const data = validateInput(ResizeCanvasSchema, input);

    // Fetch the design
    const design = await auth.apiClient.getDesign(data.designId);

    // Get existing canvasData
    const canvasData = (design.canvasData as any) || {};

    // Update canvasData with new dimensions
    const updatedCanvasData = {
        ...canvasData,
        width: data.width,
        height: data.height,
    };

    // Update both the design dimensions AND the canvasData
    await auth.apiClient.updateDesign(data.designId, {
        width: data.width,
        height: data.height,
        canvasData: updatedCanvasData,
    });

    // Notify WebSocket clients about the canvas resize
    await wsNotifier.notifyCanvasResized(data.designId, data.width, data.height);

    return {
        success: true,
        width: data.width,
        height: data.height,
        message: `Canvas resized to ${data.width}x${data.height} pixels`,
    };
}

/**
 * Clear all elements from the canvas
 */
export async function clearCanvas(auth: AuthContext, designId: string) {
    // Fetch the design
    const design = await auth.apiClient.getDesign(designId);

    const canvasData = design.canvasData as any;
    const elementCount = (canvasData.elements || []).length;

    // Update design with empty elements array but preserve other canvasData properties
    const updatedCanvasData = {
        ...canvasData,
        elements: [],
        groups: [], // Also clear groups
    };

    await auth.apiClient.updateDesign(designId, {
        canvasData: updatedCanvasData,
    });

    // Notify WebSocket clients about the canvas clear
    await wsNotifier.notifyCanvasCleared(designId);

    return {
        success: true,
        message: `Canvas cleared successfully. ${elementCount} element(s) removed.`,
    };
}
