// Type definitions for MCP server
import { z } from 'zod';

// =============================================================================
// ELEMENT TYPES
// =============================================================================

/**
 * Supported element types in the canvas
 */
export const ElementTypeEnum = z.enum([
    'rectangle',
    'circle',
    'text',
    'image',
    'line',
    'polygon',
    'star',
    'svg',
    'bezier',
    'container',
    'table',
    'qr',
    'barcode',
]);

/**
 * Border style options
 */
export const BorderStyleEnum = z.enum(['solid', 'dashed', 'dotted']);

/**
 * Object fit options for images
 */
export const ObjectFitEnum = z.enum(['fill', 'contain', 'cover', 'none', 'scale-down']);

/**
 * Text alignment options
 */
export const TextAlignEnum = z.enum(['left', 'center', 'right', 'justify']);

/**
 * Font weight options
 */
export const FontWeightEnum = z.enum(['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold']);

/**
 * Complete element schema with ALL supported properties
 * This is the comprehensive schema that MCP clients should use
 */
export const CanvasElementSchema = z.object({
    // ==========================================================================
    // CORE PROPERTIES (Required for all elements)
    // ==========================================================================
    
    /** Element type - determines rendering behavior */
    type: ElementTypeEnum,
    
    /** X position in pixels from canvas left edge (0 = left edge of canvas) */
    x: z.number().describe('X position in pixels from canvas left edge. 0 = left edge.'),
    
    /** Y position in pixels from canvas top edge (0 = top edge of canvas) */
    y: z.number().describe('Y position in pixels from canvas top edge. 0 = top edge.'),
    
    /** Width in pixels. Must be positive. */
    width: z.number().min(1).describe('Width in pixels. Must be >= 1.'),
    
    /** Height in pixels. Must be positive. */
    height: z.number().min(1).describe('Height in pixels. Must be >= 1.'),

    // ==========================================================================
    // TRANSFORM PROPERTIES
    // ==========================================================================
    
    /** Rotation angle in degrees (0-360). Rotates around center. */
    rotation: z.number().min(0).max(360).default(0).describe('Rotation in degrees (0-360). Rotates around element center.'),
    
    /** Opacity from 0 (invisible) to 1 (fully visible) */
    opacity: z.number().min(0).max(1).default(1).describe('Opacity: 0 = invisible, 1 = fully visible.'),

    // ==========================================================================
    // FILL & STROKE PROPERTIES
    // ==========================================================================
    
    /** Fill color. Supports: hex (#ff0000), rgb(255,0,0), rgba(255,0,0,0.5), named colors, or CSS gradients */
    fill: z.string().optional().describe('Fill color: hex (#ff0000), rgb(), rgba(), named colors, or CSS gradients like linear-gradient(45deg, #ff0000, #0000ff)'),
    
    /** Stroke/border color. Same format as fill. */
    stroke: z.string().optional().describe('Stroke/border color. Same formats as fill.'),
    
    /** Stroke width in pixels */
    strokeWidth: z.number().min(0).optional().describe('Stroke width in pixels.'),
    
    /** Border style for containers and rectangles */
    borderStyle: BorderStyleEnum.optional().describe('Border style: solid, dashed, or dotted'),

    // ==========================================================================
    // BORDER RADIUS PROPERTIES
    // ==========================================================================
    
    /** Corner radius in pixels (applies to all corners) */
    borderRadius: z.number().min(0).optional().describe('Corner radius in pixels for all corners.'),
    
    /** Top-left corner radius */
    borderRadiusTopLeft: z.number().min(0).optional(),
    
    /** Top-right corner radius */
    borderRadiusTopRight: z.number().min(0).optional(),
    
    /** Bottom-left corner radius */
    borderRadiusBottomLeft: z.number().min(0).optional(),
    
    /** Bottom-right corner radius */
    borderRadiusBottomRight: z.number().min(0).optional(),

    // ==========================================================================
    // TEXT PROPERTIES (for type: 'text')
    // ==========================================================================
    
    /** Text content to display */
    text: z.string().optional().describe('Text content. Supports multi-line with \\n'),
    
    /** Font size in pixels */
    fontSize: z.number().min(1).optional().describe('Font size in pixels. Common sizes: 12, 14, 16, 18, 24, 32, 48, 64, 72'),
    
    /** Font family name */
    fontFamily: z.string().optional().describe('Font family. Examples: Inter, Arial, Roboto, Open Sans, Montserrat'),
    
    /** Font weight */
    fontWeight: z.string().optional().describe('Font weight: 100-900, normal, or bold'),
    
    /** Font style */
    fontStyle: z.enum(['normal', 'italic', 'oblique']).optional(),
    
    /** Text alignment within the text box */
    textAlign: TextAlignEnum.optional().describe('Text alignment: left, center, right, or justify'),
    
    /** Text decoration */
    textDecoration: z.enum(['none', 'underline', 'line-through', 'overline']).optional(),
    
    /** Text transform */
    textTransform: z.enum(['none', 'uppercase', 'lowercase', 'capitalize']).optional(),
    
    /** Letter spacing in pixels */
    letterSpacing: z.number().optional().describe('Letter spacing in pixels. Can be negative.'),
    
    /** Line height multiplier (1.0 = normal, 1.5 = 150% height) */
    lineHeight: z.number().min(0.5).max(3).optional().describe('Line height multiplier. 1.0 = normal, 1.5 = 150%'),
    
    /** Text color (alternative to fill for text elements) */
    color: z.string().optional().describe('Text color. Alternative to fill for text elements.'),

    // ==========================================================================
    // TEXT SHADOW PROPERTIES
    // ==========================================================================
    
    /** Text shadow X offset */
    textShadowX: z.number().optional(),
    
    /** Text shadow Y offset */
    textShadowY: z.number().optional(),
    
    /** Text shadow blur radius */
    textShadowBlur: z.number().min(0).optional(),
    
    /** Text shadow color */
    textShadowColor: z.string().optional(),

    // ==========================================================================
    // TEXT STROKE PROPERTIES
    // ==========================================================================
    
    /** Text stroke width */
    textStrokeWidth: z.number().min(0).optional(),
    
    /** Text stroke color */
    textStrokeColor: z.string().optional(),

    // ==========================================================================
    // IMAGE PROPERTIES (for type: 'image' or 'svg')
    // ==========================================================================
    
    /** Image source URL */
    src: z.string().url().optional().describe('Image URL. Must be a valid URL to an image.'),
    
    /** How the image fits within its container */
    objectFit: ObjectFitEnum.optional().describe('How image fits: fill (stretch), contain (fit inside), cover (fill & crop), none, scale-down'),
    
    /** Position of image within container */
    objectPosition: z.string().optional().describe('Image position: center, top, bottom, left, right, or percentages like "50% 50%"'),

    // ==========================================================================
    // FILTER EFFECTS
    // ==========================================================================
    
    /** Blur effect in pixels */
    blur: z.number().min(0).optional().describe('Blur in pixels. 0 = no blur.'),
    
    /** Backdrop blur for container elements */
    backdropBlur: z.number().min(0).optional(),
    
    /** Brightness percentage (100 = normal) */
    brightness: z.number().min(0).max(200).optional().describe('Brightness: 0 = black, 100 = normal, 200 = 2x bright'),
    
    /** Contrast percentage (100 = normal) */
    contrast: z.number().min(0).max(200).optional().describe('Contrast: 0 = gray, 100 = normal, 200 = high contrast'),
    
    /** Saturation percentage (100 = normal) */
    saturate: z.number().min(0).max(200).optional().describe('Saturation: 0 = grayscale, 100 = normal, 200 = vivid'),
    
    /** Hue rotation in degrees */
    hueRotate: z.number().min(0).max(360).optional().describe('Hue rotation: 0-360 degrees'),

    // ==========================================================================
    // SHADOW PROPERTIES
    // ==========================================================================
    
    /** CSS box-shadow string */
    boxShadow: z.string().optional().describe('CSS box-shadow: e.g., "0 4px 6px rgba(0,0,0,0.1)"'),

    // ==========================================================================
    // LINE PROPERTIES (for type: 'line')
    // ==========================================================================
    
    /** Line end cap style */
    lineCap: z.enum(['butt', 'round', 'square']).optional(),
    
    /** Dash pattern */
    lineDash: z.string().optional().describe('Dash pattern: e.g., "5,5" for dashed line'),
    
    /** Points for polyline */
    linePoints: z.array(z.object({ x: z.number(), y: z.number() })).optional(),

    // ==========================================================================
    // POLYGON/STAR PROPERTIES
    // ==========================================================================
    
    /** Number of sides for polygon */
    polygonSides: z.number().int().min(3).optional().describe('Number of polygon sides (min 3)'),
    
    /** Custom polygon points */
    polygonPoints: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
    
    /** Number of points for star */
    starPoints: z.number().int().min(3).optional().describe('Number of star points (min 3)'),
    
    /** Inner radius for star (0-1 relative to outer) */
    starInnerRadius: z.number().min(0).max(1).optional().describe('Star inner radius: 0-1 relative to outer radius'),

    // ==========================================================================
    // SVG/BEZIER PROPERTIES
    // ==========================================================================
    
    /** SVG path data */
    svgPath: z.string().optional().describe('SVG path data: e.g., "M 0 0 L 100 100"'),
    
    /** SVG viewBox */
    svgViewBox: z.string().optional().describe('SVG viewBox: e.g., "0 0 100 100"'),
    
    /** Bezier curve points */
    bezierPoints: z.array(z.object({ x: z.number(), y: z.number() })).optional(),

    // ==========================================================================
    // VISIBILITY & STATE
    // ==========================================================================
    
    /** Element name for identification */
    name: z.string().optional().describe('Element name for identification in layers panel'),
    
    /** Whether element is locked from editing */
    locked: z.boolean().optional().describe('If true, element cannot be selected or modified in editor'),
    
    /** Whether element is visible */
    visible: z.boolean().optional().describe('If false, element is hidden from view'),
    
    /** Group ID if element belongs to a group */
    groupId: z.string().optional(),
    
    /** Whether element uses dynamic data */
    isDynamic: z.boolean().optional(),

    // ==========================================================================
    // SPACING PROPERTIES
    // ==========================================================================
    
    /** Padding (all sides) */
    padding: z.number().min(0).optional(),
    paddingTop: z.number().min(0).optional(),
    paddingRight: z.number().min(0).optional(),
    paddingBottom: z.number().min(0).optional(),
    paddingLeft: z.number().min(0).optional(),
    
    /** Margin (all sides) */
    margin: z.number().min(0).optional(),
    marginTop: z.number().min(0).optional(),
    marginRight: z.number().min(0).optional(),
    marginBottom: z.number().min(0).optional(),
    marginLeft: z.number().min(0).optional(),

    // ==========================================================================
    // TABLE PROPERTIES (for type: 'table')
    // ==========================================================================
    
    tableRows: z.number().int().min(1).optional(),
    tableColumns: z.number().int().min(1).optional(),
    tableHasHeader: z.boolean().optional(),
    tableHasVerticalHeader: z.boolean().optional(),
    tableColumnWidths: z.array(z.number()).optional(),
    tableRowHeights: z.array(z.number()).optional(),
    tableCellData: z.array(z.object({
        row: z.number(),
        col: z.number(),
        text: z.string(),
    })).optional(),
    tableHeaderData: z.array(z.object({
        col: z.number(),
        text: z.string(),
    })).optional(),
    tableHeaderBackground: z.string().optional(),
    tableHeaderTextColor: z.string().optional(),
    tableCellTextColor: z.string().optional(),
    tableCellFontSize: z.number().optional(),
    tableBorderColor: z.string().optional(),
    tableBorderWidth: z.number().optional(),
    tableAlternateRowColor: z.string().optional(),
    tableCellPadding: z.number().optional(),
    tableCellAlignment: z.enum(['left', 'center', 'right']).optional(),
    tableHeaderAlignment: z.enum(['left', 'center', 'right']).optional(),

    // ==========================================================================
    // QR CODE PROPERTIES (for type: 'qr')
    // ==========================================================================
    
    /** QR code data/content to encode */
    qrValue: z.string().optional().describe('Data to encode in QR code (URL, text, vCard, etc.)'),
    
    /** QR code foreground color */
    qrColor: z.string().optional().describe('QR code foreground color (default: black)'),
    
    /** QR code background color */
    qrBgColor: z.string().optional().describe('QR code background color (default: white)'),
    
    /** QR code error correction level */
    qrErrorLevel: z.enum(['L', 'M', 'Q', 'H']).optional().describe('Error correction: L (7%), M (15%), Q (25%), H (30%)'),
    
    /** QR code margin/quiet zone */
    qrMargin: z.number().min(0).optional().describe('Margin around QR code in modules (default: 1)'),

    // ==========================================================================
    // BARCODE PROPERTIES (for type: 'barcode')
    // ==========================================================================
    
    /** Barcode data/content to encode */
    barcodeValue: z.string().optional().describe('Data to encode in barcode'),
    
    /** Barcode format/symbology */
    barcodeFormat: z.enum(['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'UPCE', 'ITF14', 'MSI', 'pharmacode', 'codabar']).optional().describe('Barcode format'),
    
    /** Barcode line/bar color */
    barcodeLineColor: z.string().optional().describe('Barcode bar color (default: black)'),
    
    /** Barcode background color */
    barcodeBackground: z.string().optional().describe('Barcode background color (default: transparent)'),
    
    /** Whether to show human-readable text below barcode */
    barcodeShowText: z.boolean().optional().describe('Show text below barcode (default: true)'),
    
    /** Barcode text font size */
    barcodeFontSize: z.number().min(8).max(48).optional().describe('Font size for barcode text (default: 20)'),
    
    /** Barcode text margin */
    barcodeTextMargin: z.number().min(0).max(20).optional().describe('Margin between barcode and text (default: 2)'),
    
    /** Barcode text alignment */
    barcodeTextAlign: z.enum(['left', 'center', 'right']).optional().describe('Text alignment (default: center)'),
});

// =============================================================================
// TOOL INPUT SCHEMAS
// =============================================================================

export const CreateDesignSchema = z.object({
    name: z.string().min(1).max(255).describe('Design name'),
    width: z.number().int().min(1).max(10000).default(1920).describe('Canvas width in pixels'),
    height: z.number().int().min(1).max(10000).default(1080).describe('Canvas height in pixels'),
    description: z.string().optional().describe('Design description'),
    visibility: z.enum(['PRIVATE', 'PUBLIC', 'UNLISTED']).default('PRIVATE'),
});

export const UpdateDesignSchema = z.object({
    designId: z.string(),
    name: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    visibility: z.enum(['PRIVATE', 'PUBLIC', 'UNLISTED']).optional(),
    width: z.number().int().min(1).max(10000).optional(),
    height: z.number().int().min(1).max(10000).optional(),
    canvasData: z.any().optional(),
});

export const ExportDesignSchema = z.object({
    designId: z.string(),
    format: z.enum(['png', 'jpg', 'jpeg', 'pdf', 'svg']).default('png'),
    quality: z.number().int().min(1).max(100).default(100),
});

/**
 * Add element input schema - uses the comprehensive element schema
 */
export const AddElementSchema = z.object({
    designId: z.string().describe('ID of the design to add the element to'),
    element: CanvasElementSchema.describe('Element to add. See element properties for all options.'),
});

export const UpdateElementSchema = z.object({
    designId: z.string(),
    elementId: z.string(),
    updates: z.record(z.any()).describe('Partial element properties to update. Can include any element property.'),
});

export const DeleteElementSchema = z.object({
    designId: z.string(),
    elementId: z.string(),
});

export const ResizeCanvasSchema = z.object({
    designId: z.string(),
    width: z.number().int().min(1).max(10000).describe('New canvas width in pixels'),
    height: z.number().int().min(1).max(10000).describe('New canvas height in pixels'),
});

export const ListDesignsSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    search: z.string().optional(),
    isTemplate: z.boolean().optional(),
});

export const ListAssetsSchema = z.object({
    type: z.enum(['IMAGE', 'VIDEO', 'AUDIO', 'FONT', 'OTHER']).optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
});

export const SearchStockImagesSchema = z.object({
    query: z.string().min(1),
    page: z.number().int().min(1).default(1),
    perPage: z.number().int().min(1).max(100).default(20),
});

export const GenerateDesignSchema = z.object({
    prompt: z.string().min(1),
    width: z.number().int().min(1).max(10000).default(1920),
    height: z.number().int().min(1).max(10000).default(1080),
    name: z.string().optional(),
});

export const ChatWithCiviSchema = z.object({
    designId: z.string(),
    message: z.string().min(1),
    sessionId: z.string().optional(),
});

export const ListTemplatesSchema = z.object({
    category: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
});

export const ApplyTemplateSchema = z.object({
    designId: z.string(),
    templateId: z.string(),
});

// Type exports
export type CreateDesignInput = z.infer<typeof CreateDesignSchema>;
export type UpdateDesignInput = z.infer<typeof UpdateDesignSchema>;
export type ExportDesignInput = z.infer<typeof ExportDesignSchema>;
export type AddElementInput = z.infer<typeof AddElementSchema>;
export type UpdateElementInput = z.infer<typeof UpdateElementSchema>;
export type DeleteElementInput = z.infer<typeof DeleteElementSchema>;
export type ResizeCanvasInput = z.infer<typeof ResizeCanvasSchema>;
export type ListDesignsInput = z.infer<typeof ListDesignsSchema>;
export type ListAssetsInput = z.infer<typeof ListAssetsSchema>;
export type SearchStockImagesInput = z.infer<typeof SearchStockImagesSchema>;
export type GenerateDesignInput = z.infer<typeof GenerateDesignSchema>;
export type ChatWithCiviInput = z.infer<typeof ChatWithCiviSchema>;
export type ListTemplatesInput = z.infer<typeof ListTemplatesSchema>;
export type ApplyTemplateInput = z.infer<typeof ApplyTemplateSchema>;
export type CanvasElement = z.infer<typeof CanvasElementSchema>;
