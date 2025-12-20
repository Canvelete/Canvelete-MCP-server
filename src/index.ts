#!/usr/bin/env node

/**
 * Canvelete MCP Server
 * 
 * Model Context Protocol server for Canvelete design platform.
 * Exposes design, canvas, asset, and AI capabilities to MCP clients.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListResourcesRequestSchema,
    ListToolsRequestSchema,
    ReadResourceRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';
import { Command } from 'commander';

// Load environment variables
dotenv.config();

// Import modules
import { authenticateApiKey } from './auth.js';
import { formatError, logError } from './utils/errors.js';
import { logger } from './utils/logger.js';

// Import resources
import {
    getDesignResource,
    listDesignsResource,
    listTemplatesResource,
} from './resources/designs.js';
import { getCanvasResource, getCanvasElementsResource } from './resources/canvas.js';
import { getAssetsLibraryResource, getFontsResource } from './resources/assets.js';
import { getUserProfileResource, getUserPreferencesResource } from './resources/user.js';
import { getMetadataResource } from './resources/metadata.js';

// Import tools
import {
    getDesign,
    listDesigns,
    createDesign,
    updateDesign,
    deleteDesign,
    duplicateDesign,
    exportDesign,
} from './tools/design-tools.js';
import {
    addElement,
    updateElement,
    deleteElement,
    resizeCanvas,
    clearCanvas,
} from './tools/canvas-tools.js';
import { listTemplates, applyTemplate, createTemplate } from './tools/template-tools.js';
import { listAssets, searchStockImages, searchIcons, searchClipart, searchIllustrations, listFonts, uploadAsset } from './tools/asset-tools.js';
import { generateDesign, chatWithCivi } from './tools/ai-tools.js';

// Import prompts
import { allPrompts, getPromptContent } from './prompts/index.js';

// CLI Setup
const program = new Command();

program
    .name('canvelete-mcp')
    .description('Canvelete MCP Server CLI')
    .version('1.0.4');

/**
 * Create and configure the MCP server
 * @param apiKey - Optional API key override
 */
async function createServer(apiKeyOverride?: string) {
    const server = new Server(
        {
            name: 'canvelete-mcp-server',
            version: '1.1.0',
        },
        {
            capabilities: {
                // Resources capability with optional listChanged notification
                resources: {
                    listChanged: true, // Server will notify when resource list changes
                },
                // Tools capability with optional listChanged notification
                tools: {
                    listChanged: true, // Server will notify when tool list changes
                },
                // Prompts capability with optional listChanged notification
                prompts: {
                    listChanged: true, // Server will notify when prompt list changes
                },
            },
        }
    );

    // Helper to get auth from request arguments
    const getAuth = async (args: any) => {
        // Priority: Argument > CLI Override > Env Var
        const apiKey = args?.apiKey || apiKeyOverride || process.env.CANVELETE_API_KEY;

        if (!apiKey) {
            throw new Error('API key is required. Provide apiKey tool argument, --api-key CLI option, or set CANVELETE_API_KEY env var.');
        }
        try {
            return await authenticateApiKey(apiKey);
        } catch (error) {
            const keyPreview = apiKey.substring(0, 5) + '...';
            throw new Error(`Invalid API key (${keyPreview}). Please verify your API key is correct and active.`);
        }
    };

    /**
     * List available resources
     */
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        return {
            resources: [
                {
                    uri: 'canvelete://api/designs/list',
                    name: 'User Designs',
                    description: 'List all designs owned by or shared with the user',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/designs/templates',
                    name: 'Design Templates',
                    description: 'Browse public design templates',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/design/{id}',
                    name: 'Design Details',
                    description: 'Get detailed information about a specific design',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/canvas/{designId}',
                    name: 'Canvas State',
                    description: 'Get the current canvas state for a design',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/canvas/{designId}/elements',
                    name: 'Canvas Elements',
                    description: 'Get all elements on a design canvas',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/assets/library',
                    name: 'Asset Library',
                    description: "User's uploaded assets",
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/assets/fonts',
                    name: 'Available Fonts',
                    description: 'List of available fonts for text elements',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/user/profile',
                    name: 'User Profile',
                    description: 'User profile and subscription information',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/user/preferences',
                    name: 'User Preferences',
                    description: 'User editor preferences and settings',
                    mimeType: 'application/json',
                },
                {
                    uri: 'canvelete://api/metadata/schema',
                    name: 'System Metadata',
                    description: 'Schema information, capabilities, and property definitions',
                    mimeType: 'application/json',
                },
            ],
        };
    });

    /**
     * Read a specific resource
     */
    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const uriString = request.params.uri;
        const auth = await getAuth(request.params as any);

        try {
            const url = new URL(uriString);
            const path = url.pathname;
            const normalizedPath = path.startsWith('/api/') ? path.replace('/api/', '/') : path;

            if (normalizedPath === '/designs/list' || uriString.endsWith('designs/list')) {
                return await listDesignsResource(auth);
            }

            if (normalizedPath === '/designs/templates' || uriString.endsWith('designs/templates')) {
                return await listTemplatesResource();
            }

            if (normalizedPath.startsWith('/design/')) {
                const designId = normalizedPath.split('/').pop()!;
                return await getDesignResource(auth, designId);
            }

            if (normalizedPath.startsWith('/canvas/')) {
                const parts = normalizedPath.split('/');
                const designId = parts[2];
                if (normalizedPath.endsWith('/elements')) {
                    return await getCanvasElementsResource(auth, designId);
                }
                return await getCanvasResource(auth, designId);
            }

            if (normalizedPath === '/assets/library' || uriString.endsWith('assets/library')) {
                return await getAssetsLibraryResource(auth);
            }

            if (normalizedPath === '/assets/fonts' || uriString.endsWith('assets/fonts')) {
                return await getFontsResource();
            }

            if (normalizedPath === '/user/profile' || uriString.endsWith('user/profile')) {
                return await getUserProfileResource(auth);
            }

            if (normalizedPath === '/user/preferences' || uriString.endsWith('user/preferences')) {
                return await getUserPreferencesResource(auth);
            }

            if (normalizedPath === '/metadata/schema' || uriString.endsWith('metadata/schema')) {
                return await getMetadataResource();
            }

            // Protocol error: Unknown resource (per MCP spec, use -32002 for resource not found)
            throw new Error(`Unknown resource: ${uriString}`);
        } catch (error) {
            logError(error, { uri: uriString });
            // Re-throw as protocol error (will be handled by MCP SDK with proper error code)
            throw error;
        }
    });

    /**
     * List available tools
     */
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: 'list_designs',
                    description: 'List all designs owned by or shared with the user',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string', description: 'Canvelete API key' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            limit: { type: 'number', description: 'Items per page', default: 20 },
                            search: { type: 'string', description: 'Search query' },
                        },
                    },
                },
                {
                    name: 'create_design',
                    description: 'Create a new design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            name: { type: 'string', description: 'Design name' },
                            width: { type: 'number', description: 'Canvas width in pixels', default: 1920 },
                            height: { type: 'number', description: 'Canvas height in pixels', default: 1080 },
                            description: { type: 'string' },
                            visibility: { type: 'string', enum: ['PRIVATE', 'PUBLIC', 'UNLISTED'], default: 'PRIVATE' },
                        },
                        required: ['name'],
                    },
                },
                {
                    name: 'get_design',
                    description: 'Get detailed information about a specific design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID' },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'update_design',
                    description: 'Update an existing design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            visibility: { type: 'string', enum: ['PRIVATE', 'PUBLIC', 'UNLISTED'] },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'delete_design',
                    description: 'Delete a design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string' },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'duplicate_design',
                    description: 'Duplicate a design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string' },
                            newName: { type: 'string' },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'export_design',
                    description: 'Export a design to PNG, JPG, PDF, or SVG',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string' },
                            format: { type: 'string', enum: ['png', 'jpg', 'jpeg', 'pdf', 'svg'], default: 'png' },
                            quality: { type: 'number', minimum: 1, maximum: 100, default: 100 },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'add_element',
                    description: 'Add an element to the canvas. x=0 is left edge, y=0 is top edge. Supports all element types including SVG shapes, QR codes (type: "qr"), and barcodes (type: "barcode").',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string' },
                            element: {
                                type: 'object',
                                description: 'Element to add. Supports: rectangle, circle, text, image, svg, line, polygon, star, bezier, container, table, qr, barcode. Use svgPath + svgViewBox for custom shapes.',
                                properties: {
                                    // Core properties
                                    type: { type: 'string', enum: ['rectangle', 'circle', 'text', 'image', 'line', 'polygon', 'star', 'svg', 'bezier', 'container', 'table', 'qr', 'barcode'], description: 'Element type. Use "polygon" with svgPath for pattern shapes, "qr" for QR codes, "barcode" for barcodes.' },
                                    x: { type: 'number', description: 'X position in pixels from left edge (0 = left)' },
                                    y: { type: 'number', description: 'Y position in pixels from top edge (0 = top)' },
                                    width: { type: 'number', description: 'Width in pixels' },
                                    height: { type: 'number', description: 'Height in pixels' },
                                    name: { type: 'string', description: 'Descriptive name for the element (e.g., "header_background", "clover_pattern_tile")' },

                                    // Transform properties
                                    rotation: { type: 'number', description: 'Rotation in degrees (0-360)' },
                                    opacity: { type: 'number', description: 'Opacity from 0 (invisible) to 1 (fully visible)' },
                                    visible: { type: 'boolean', description: 'Whether element is visible' },
                                    locked: { type: 'boolean', description: 'Whether element is locked from editing' },

                                    // Fill & stroke
                                    fill: { type: 'string', description: 'Fill color: hex (#ff0000), rgb(), rgba(), gradients' },
                                    stroke: { type: 'string', description: 'Stroke/border color' },
                                    strokeWidth: { type: 'number', description: 'Stroke width in pixels' },
                                    borderStyle: { type: 'string', enum: ['solid', 'dashed', 'dotted'] },

                                    // Border radius
                                    borderRadius: { type: 'number', description: 'Corner radius in pixels (all corners)' },
                                    borderRadiusTopLeft: { type: 'number' },
                                    borderRadiusTopRight: { type: 'number' },
                                    borderRadiusBottomLeft: { type: 'number' },
                                    borderRadiusBottomRight: { type: 'number' },

                                    // Text properties
                                    text: { type: 'string', description: 'Text content (use {{var}} for dynamic)' },
                                    fontSize: { type: 'number', description: 'Font size in pixels' },
                                    fontFamily: { type: 'string', description: 'Font family name' },
                                    fontWeight: { type: 'string', description: 'Font weight: 100-900, normal, bold' },
                                    fontStyle: { type: 'string', enum: ['normal', 'italic', 'oblique'] },
                                    textAlign: { type: 'string', enum: ['left', 'center', 'right', 'justify'] },
                                    textDecoration: { type: 'string', enum: ['none', 'underline', 'line-through', 'overline'] },
                                    textTransform: { type: 'string', enum: ['none', 'uppercase', 'lowercase', 'capitalize'] },
                                    letterSpacing: { type: 'number' },
                                    lineHeight: { type: 'number' },
                                    color: { type: 'string', description: 'Text color (alternative to fill)' },

                                    // Text effects
                                    textShadowX: { type: 'number' },
                                    textShadowY: { type: 'number' },
                                    textShadowBlur: { type: 'number' },
                                    textShadowColor: { type: 'string' },
                                    textStrokeWidth: { type: 'number' },
                                    textStrokeColor: { type: 'string' },

                                    // Image properties
                                    src: { type: 'string', description: 'Image/SVG URL' },
                                    objectFit: { type: 'string', enum: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
                                    objectPosition: { type: 'string' },

                                    // Filter effects
                                    blur: { type: 'number', description: 'Blur in pixels' },
                                    backdropBlur: { type: 'number' },
                                    brightness: { type: 'number', description: '0-200, 100 = normal' },
                                    contrast: { type: 'number', description: '0-200, 100 = normal' },
                                    saturate: { type: 'number', description: '0-200, 100 = normal' },
                                    hueRotate: { type: 'number', description: '0-360 degrees' },
                                    boxShadow: { type: 'string', description: 'CSS box-shadow' },

                                    // Line properties
                                    lineCap: { type: 'string', enum: ['butt', 'round', 'square'] },
                                    lineDash: { type: 'string' },
                                    linePoints: { type: 'array', items: { type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' } } } },

                                    // Polygon/Star properties
                                    polygonSides: { type: 'number', description: 'Number of sides for regular polygon' },
                                    polygonPoints: { type: 'array', items: { type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' } } } },
                                    starPoints: { type: 'number', description: 'Number of star points' },
                                    starInnerRadius: { type: 'number', description: 'Inner radius 0-1' },

                                    // SVG/Pattern properties - USE THESE FOR EXTRA SHAPES
                                    svgPath: { type: 'string', description: 'SVG path data for custom shapes. Get from shapes library (basic, arrows, stars, callouts, nature, symbols, geometric, extra). Extra shapes include Clover, Pinwheel, Wave Curves, etc.' },
                                    svgViewBox: { type: 'string', description: 'SVG viewBox (e.g., "0 0 256 256" for extra shapes, "0 0 100 100" for basic shapes)' },

                                    // Bezier properties
                                    bezierPoints: { type: 'array', items: { type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' } } } },

                                    // Dynamic properties
                                    isDynamic: { type: 'boolean', description: 'Set true for template variables' },
                                    groupId: { type: 'string' },

                                    // Spacing
                                    padding: { type: 'number' },
                                    paddingTop: { type: 'number' },
                                    paddingRight: { type: 'number' },
                                    paddingBottom: { type: 'number' },
                                    paddingLeft: { type: 'number' },
                                    margin: { type: 'number' },
                                    marginTop: { type: 'number' },
                                    marginRight: { type: 'number' },
                                    marginBottom: { type: 'number' },
                                    marginLeft: { type: 'number' },

                                    // Table properties
                                    tableRows: { type: 'number' },
                                    tableColumns: { type: 'number' },
                                    tableHasHeader: { type: 'boolean' },
                                    tableHasVerticalHeader: { type: 'boolean' },
                                    tableColumnWidths: { type: 'array', items: { type: 'number' } },
                                    tableRowHeights: { type: 'array', items: { type: 'number' } },
                                    tableCellData: { type: 'array', items: { type: 'object' } },
                                    tableHeaderData: { type: 'array', items: { type: 'object' } },
                                    tableHeaderBackground: { type: 'string' },
                                    tableHeaderTextColor: { type: 'string' },
                                    tableCellTextColor: { type: 'string' },
                                    tableCellFontSize: { type: 'number' },
                                    tableBorderColor: { type: 'string' },
                                    tableBorderWidth: { type: 'number' },
                                    tableAlternateRowColor: { type: 'string' },
                                    tableCellPadding: { type: 'number' },
                                    tableCellAlignment: { type: 'string', enum: ['left', 'center', 'right'] },
                                    tableHeaderAlignment: { type: 'string', enum: ['left', 'center', 'right'] },

                                    // QR Code properties (for type: 'qr')
                                    qrValue: { type: 'string', description: 'Data to encode in QR code (URL, text, vCard, etc.)' },
                                    qrColor: { type: 'string', description: 'QR code foreground color (default: black)' },
                                    qrBgColor: { type: 'string', description: 'QR code background color (default: white)' },
                                    qrErrorLevel: { type: 'string', enum: ['L', 'M', 'Q', 'H'], description: 'Error correction: L (7%), M (15%), Q (25%), H (30%)' },
                                    qrMargin: { type: 'number', description: 'Margin around QR code in modules (default: 1)' },
                                    
                                    // Barcode properties (for type: 'barcode')
                                    barcodeValue: { type: 'string', description: 'Data to encode in barcode' },
                                    barcodeFormat: { type: 'string', enum: ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'UPCE', 'ITF14', 'MSI', 'pharmacode', 'codabar'], description: 'Barcode format' },
                                    barcodeLineColor: { type: 'string', description: 'Barcode bar color (default: black)' },
                                    barcodeBackground: { type: 'string', description: 'Barcode background color (default: transparent)' },
                                    barcodeShowText: { type: 'boolean', description: 'Show text below barcode (default: true)' },
                                    barcodeFontSize: { type: 'number', description: 'Font size for barcode text (default: 20)' },
                                    barcodeTextMargin: { type: 'number', description: 'Margin between barcode and text (default: 2)' },
                                    barcodeTextAlign: { type: 'string', enum: ['left', 'center', 'right'], description: 'Text alignment (default: center)' },
                                },
                                required: ['type', 'x', 'y', 'width', 'height'],
                            },
                        },
                        required: ['designId', 'element'],
                    },
                },
                // Alias tools for clients expecting 590_* names
                { name: '590_add_element', description: 'Alias of add_element', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, element: { type: 'object' } }, required: ['designId', 'element'] } },
                { name: '590_update_element', description: 'Alias of update_element', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, elementId: { type: 'string' }, updates: { type: 'object' } }, required: ['designId', 'elementId', 'updates'] } },
                { name: '590_delete_element', description: 'Alias of delete_element', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, elementId: { type: 'string' }, updates: { type: 'object' } }, required: ['designId', 'elementId'] } },
                { name: '590_resize_canvas', description: 'Alias of resize_canvas', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, width: { type: 'number' }, height: { type: 'number' } }, required: ['designId', 'width', 'height'] } },
                { name: '590_clear_canvas', description: 'Alias of clear_canvas', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' } }, required: ['designId'] } },
                { name: '590_list_designs', description: 'Alias of list_designs', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, page: { type: 'number', default: 1 }, limit: { type: 'number', default: 20 }, search: { type: 'string' } } } },
                { name: '590_create_design', description: 'Alias of create_design', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, name: { type: 'string' }, width: { type: 'number', default: 1920 }, height: { type: 'number', default: 1080 }, description: { type: 'string' }, visibility: { type: 'string', enum: ['PRIVATE', 'PUBLIC', 'UNLISTED'], default: 'PRIVATE' } }, required: ['name'] } },
                { name: '590_get_design', description: 'Alias of get_design', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' } }, required: ['designId'] } },
                { name: '590_update_design', description: 'Alias of update_design', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' }, visibility: { type: 'string', enum: ['PRIVATE', 'PUBLIC', 'UNLISTED'] }, width: { type: 'number' }, height: { type: 'number' }, canvasData: { type: 'object' } }, required: ['designId'] } },
                { name: '590_duplicate_design', description: 'Alias of duplicate_design', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, newName: { type: 'string' } }, required: ['designId'] } },
                { name: '590_export_design', description: 'Alias of export_design', inputSchema: { type: 'object', properties: { apiKey: { type: 'string' }, designId: { type: 'string' }, format: { type: 'string', enum: ['png', 'jpg', 'jpeg', 'pdf', 'svg'], default: 'png' }, quality: { type: 'number', minimum: 1, maximum: 100, default: 100 } }, required: ['designId'] } },
                {
                    name: 'update_element',
                    description: 'Update an existing element on the canvas',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID' },
                            elementId: { type: 'string', description: 'Element ID to update' },
                            updates: {
                                type: 'object',
                                description: 'Properties to update (same structure as add_element element parameter)',
                            },
                        },
                        required: ['designId', 'elementId', 'updates'],
                    },
                },
                {
                    name: 'delete_element',
                    description: 'Delete an element from the canvas',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID' },
                            elementId: { type: 'string', description: 'Element ID to delete' },
                        },
                        required: ['designId', 'elementId'],
                    },
                },
                {
                    name: 'resize_canvas',
                    description: 'Resize the canvas dimensions',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID' },
                            width: { type: 'number', description: 'New width in pixels' },
                            height: { type: 'number', description: 'New height in pixels' },
                        },
                        required: ['designId', 'width', 'height'],
                    },
                },
                {
                    name: 'clear_canvas',
                    description: 'Remove all elements from the canvas',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID' },
                        },
                        required: ['designId'],
                    },
                },
                {
                    name: 'list_templates',
                    description: 'List available design templates',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: { type: 'string', description: 'Template category filter' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            limit: { type: 'number', description: 'Items per page', default: 20 },
                        },
                    },
                },
                {
                    name: 'apply_template',
                    description: 'Apply a template to an existing design',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID to apply template to' },
                            templateId: { type: 'string', description: 'Template ID to apply' },
                        },
                        required: ['designId', 'templateId'],
                    },
                },
                {
                    name: 'create_template',
                    description: 'Save a design as a reusable template',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            designId: { type: 'string', description: 'Design ID to save as template' },
                            name: { type: 'string', description: 'Template name' },
                            description: { type: 'string', description: 'Template description' },
                            category: { type: 'string', description: 'Template category' },
                        },
                        required: ['designId', 'name'],
                    },
                },
                {
                    name: 'list_assets',
                    description: 'List user assets from the library',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            type: { type: 'string', enum: ['IMAGE', 'FONT', 'VIDEO', 'AUDIO'], description: 'Filter by asset type' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            limit: { type: 'number', description: 'Items per page', default: 20 },
                        },
                    },
                },
                {
                    name: 'search_stock_images',
                    description: 'Search for stock images from Pixabay',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string', description: 'Canvelete API key' },
                            query: { type: 'string', description: 'Search query' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            perPage: { type: 'number', description: 'Results per page', default: 20 },
                        },
                        required: ['query'],
                    },
                },
                {
                    name: 'search_icons',
                    description: 'Search for icon assets',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string', description: 'Canvelete API key' },
                            query: { type: 'string', description: 'Search query' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            perPage: { type: 'number', description: 'Results per page', default: 20 },
                        },
                        required: ['query'],
                    },
                },
                {
                    name: 'search_clipart',
                    description: 'Search for clipart images',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string', description: 'Canvelete API key' },
                            query: { type: 'string', description: 'Search query' },
                            tag: { type: 'string', description: 'Tag filter' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            perPage: { type: 'number', description: 'Results per page', default: 20 },
                        },
                        required: ['query'],
                    },
                },
                {
                    name: 'search_illustrations',
                    description: 'Search for illustration assets',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string', description: 'Canvelete API key' },
                            query: { type: 'string', description: 'Search query' },
                            category: { type: 'string', description: 'Category filter' },
                            page: { type: 'number', description: 'Page number', default: 1 },
                            perPage: { type: 'number', description: 'Results per page', default: 20 },
                        },
                        required: ['query'],
                    },
                },
                {
                    name: 'list_fonts',
                    description: 'List available fonts by category',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: { type: 'string', description: 'Font category filter (e.g., "serif", "sans-serif", "monospace")' },
                        },
                    },
                },
                {
                    name: 'upload_asset',
                    description: 'Upload a new asset to the library',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            file: { type: 'string', description: 'File path or URL to upload' },
                            name: { type: 'string', description: 'Asset name' },
                            type: { type: 'string', enum: ['IMAGE', 'FONT', 'VIDEO', 'AUDIO'], description: 'Asset type' },
                        },
                        required: ['file', 'name', 'type'],
                    },
                },
                {
                    name: 'generate_design',
                    description: 'Generate a design using AI',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            prompt: { type: 'string', description: 'AI prompt describing the design to generate' },
                            width: { type: 'number', description: 'Canvas width', default: 1920 },
                            height: { type: 'number', description: 'Canvas height', default: 1080 },
                            style: { type: 'string', description: 'Design style preference' },
                        },
                        required: ['prompt'],
                    },
                },
                {
                    name: 'chat_with_civi',
                    description: 'Interact with Civi AI for design assistance',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            apiKey: { type: 'string' },
                            message: { type: 'string', description: 'Message to send to Civi AI' },
                            context: { type: 'object', description: 'Additional context for the conversation' },
                        },
                        required: ['message'],
                    },
                },
                {
                    name: 'list_shapes',
                    description: 'List available SVG shapes from the shapes library',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            category: { type: 'string', description: 'Shape category: basic, arrows, stars, callouts, nature, symbols, geometric, extra, or "all"', default: 'all' },
                        },
                    },
                },
            ],
        };
    });

    /**
     * Execute a tool
     */
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;

        try {
            switch (name) {
                case 'list_designs': {
                    const auth = await getAuth(args);
                    const result = await listDesigns(auth, args?.page as number | undefined, args?.limit as number | undefined, args?.search as string | undefined);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'create_design': {
                    const auth = await getAuth(args);
                    const result = await createDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'get_design': {
                    const auth = await getAuth(args);
                    const result = await getDesign(auth, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'update_design': {
                    const auth = await getAuth(args);
                    const result = await updateDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'delete_design': {
                    const auth = await getAuth(args);
                    const result = await deleteDesign(auth, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'duplicate_design': {
                    const auth = await getAuth(args);
                    const result = await duplicateDesign(auth, (args as any).designId, (args as any).newName);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'export_design': {
                    const auth = await getAuth(args);
                    const result = await exportDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'add_element': {
                    const auth = await getAuth(args);
                    const result = await addElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'update_element': {
                    const auth = await getAuth(args);
                    const result = await updateElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'delete_element': {
                    const auth = await getAuth(args);
                    const result = await deleteElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'resize_canvas': {
                    const auth = await getAuth(args);
                    const result = await resizeCanvas(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'clear_canvas': {
                    const auth = await getAuth(args);
                    const result = await clearCanvas(auth, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'list_templates': {
                    const result = await listTemplates(args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'apply_template': {
                    const auth = await getAuth(args);
                    const result = await applyTemplate(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'list_assets': {
                    const auth = await getAuth(args);
                    const result = await listAssets(auth, args);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'search_stock_images': {
                    const auth = await getAuth(args);
                    const result = await searchStockImages(auth, args);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'search_icons': {
                    const auth = await getAuth(args);
                    const result = await searchIcons(auth, (args as any).query, (args as any).page, (args as any).perPage);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'search_clipart': {
                    const auth = await getAuth(args);
                    const result = await searchClipart(auth, (args as any).query, (args as any).tag, (args as any).page, (args as any).perPage);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'search_illustrations': {
                    const auth = await getAuth(args);
                    const result = await searchIllustrations(auth, (args as any).query, (args as any).category, (args as any).page, (args as any).perPage);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'list_fonts': {
                    const result = await listFonts((args as any)?.category);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'list_shapes': {
                    const { getShapes } = await import('./utils/shapes.js');
                    const category = (args as any)?.category || 'all';
                    const result = getShapes(category);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'upload_asset': {
                    const auth = await getAuth(args);
                    const result = await uploadAsset(auth, (args as any).file, (args as any).type);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'generate_design': {
                    const auth = await getAuth(args);
                    const result = await generateDesign(auth, (args as any).prompt, (args as any).style);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case 'chat_with_civi': {
                    const auth = await getAuth(args);
                    const result = await chatWithCivi(auth, (args as any).message, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                // Aliases mapping to existing implementations
                case '590_add_element': {
                    const auth = await getAuth(args);
                    const result = await addElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_update_element': {
                    const auth = await getAuth(args);
                    const result = await updateElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_delete_element': {
                    const auth = await getAuth(args);
                    const result = await deleteElement(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_resize_canvas': {
                    const auth = await getAuth(args);
                    const result = await resizeCanvas(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_clear_canvas': {
                    const auth = await getAuth(args);
                    const result = await clearCanvas(auth, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_list_designs': {
                    const auth = await getAuth(args);
                    const result = await listDesigns(auth, args?.page as number | undefined, args?.limit as number | undefined, args?.search as string | undefined);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_create_design': {
                    const auth = await getAuth(args);
                    const result = await createDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_get_design': {
                    const auth = await getAuth(args);
                    const result = await getDesign(auth, (args as any).designId);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_update_design': {
                    const auth = await getAuth(args);
                    const result = await updateDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_duplicate_design': {
                    const auth = await getAuth(args);
                    const result = await duplicateDesign(auth, (args as any).designId, (args as any).newName);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                case '590_export_design': {
                    const auth = await getAuth(args);
                    const result = await exportDesign(auth, args as any);
                    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
                }
                default:
                    // Protocol error: Unknown tool (per MCP spec, this is a protocol error)
                    throw new Error(`Unknown tool: ${name}`);
            }
        } catch (error) {
            logError(error, { tool: name, args });
            
            // Check if this is a protocol error (unknown tool) or tool execution error
            if (error instanceof Error && error.message.startsWith('Unknown tool:')) {
                // Protocol error - rethrow to be handled as JSON-RPC error
                throw error;
            }
            
            // Tool execution error - return with isError: true (per MCP spec)
            const errorInfo = formatError(error);
            return {
                content: [{ type: 'text', text: JSON.stringify(errorInfo, null, 2) }],
                isError: true, // Tool execution error (not protocol error)
            };
        }
    });

    /**
     * List available prompts
     */
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
        return { prompts: allPrompts };
    });

    /**
     * Get prompt content
     */
    server.setRequestHandler(GetPromptRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        const content = getPromptContent(name, args || {});
        return {
            messages: [{ role: 'user', content: { type: 'text', text: content } }],
        };
    });

    return server;
}

// Start Command
program
    .command('start')
    .description('Start the MCP server (local stdio mode - default for MCP clients)')
    .option('-k, --api-key <key>', 'Canvelete API Key override')
    .action(async (options) => {
        try {
            // Use logger (writes to stderr) - NEVER use console.log for stdout in STDIO servers
            logger.info('Starting Canvelete MCP Server v1.1.0 (Local stdio mode)...');
            if (options.apiKey) {
                logger.info('Using API Key from CLI option');
            }

            const server = await createServer(options.apiKey);
            const transport = new StdioServerTransport();
            await server.connect(transport);

            logger.info('Canvelete MCP Server running on stdio');
            logger.info('Note: For cloud deployment, use a reverse proxy or container with stdio transport');

            // Keep alive - server will handle stdio communication
        } catch (error) {
            logger.error('Fatal error starting server', error);
            process.exit(1);
        }
    });

// Debug Command
program
    .command('inspect')
    .description('Inspect server configuration')
    .action(() => {
        // Use stderr for inspect command output (stdout is reserved for JSON-RPC)
        // This command is safe because it's not used during MCP protocol communication
        logger.info('Canvelete MCP Server Configuration:');
        logger.info(`API Key Present: ${!!process.env.CANVELETE_API_KEY}`);
        logger.info(`Node Version: ${process.version}`);
        logger.info(`Server Version: 1.1.0`);
    });

// Parse Args
program.parse(process.argv);

// If no command provided, show help
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
