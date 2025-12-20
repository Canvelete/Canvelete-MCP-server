# Complete Element Types Guide

This guide provides comprehensive documentation for all element types supported by the Canvelete MCP server, including their capabilities, styling limits, and best practices.

## Table of Contents

- [Element Types Overview](#element-types-overview)
- [Basic Shapes](#basic-shapes)
- [Text Elements](#text-elements)
- [Image Elements](#image-elements)
- [Advanced Elements](#advanced-elements)
- [QR Codes & Barcodes](#qr-codes--barcodes)
- [Dynamic Elements](#dynamic-elements)
- [Styling Capabilities Matrix](#styling-capabilities-matrix)

## Element Types Overview

Canvelete supports 13 element types, each with specific capabilities and use cases:

| Element Type | Primary Use | Dynamic Support | Styling Flexibility |
|-------------|-------------|-----------------|---------------------|
| `rectangle` | Backgrounds, containers, buttons | No | High |
| `circle` | Avatars, decorative elements | No | High |
| `text` | Headlines, body text, labels | **Yes** | High |
| `image` | Photos, illustrations | **Yes** | Medium |
| `svg` | Icons, logos, vector graphics | No | Low |
| `line` | Dividers, borders, connectors | No | Medium |
| `polygon` | Custom shapes, patterns | No | High |
| `star` | Ratings, badges, decorations | No | High |
| `qrcode` | QR codes for URLs, data | **Yes** | Low |
| `barcode` | Product codes, tracking | **Yes** | Low |
| `table` | Data tables, reports | **Yes** | Medium |
| `container` | Layout groups, glassmorphism | No | High |
| `bezier` | Organic curves, custom paths | No | Medium |

## Basic Shapes

### Rectangle

**Description:** Versatile rectangular shape with rounded corners support

**Required Properties:**
```typescript
{
  type: 'rectangle',
  x: number,      // Position from left edge
  y: number,      // Position from top edge
  width: number,  // Width in pixels
  height: number  // Height in pixels
}
```

**Styling Capabilities:**
- ✅ Fill (solid colors, gradients)
- ✅ Stroke (border)
- ✅ Border radius (rounded corners)
- ✅ Rotation
- ✅ Opacity
- ✅ Filters (blur, brightness, etc.)
- ✅ Box shadow

**Example:**
```json
{
  "type": "rectangle",
  "x": 100,
  "y": 100,
  "width": 300,
  "height": 200,
  "fill": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "borderRadius": 16,
  "boxShadow": "0 10px 30px rgba(0,0,0,0.2)"
}
```

### Circle

**Description:** Circular or elliptical shape (width = height for perfect circle)

**Styling Capabilities:**
- ✅ Fill (solid colors, gradients)
- ✅ Stroke
- ✅ Rotation
- ✅ Opacity
- ✅ Filters
- ❌ Border radius (not needed)

**Tips:**
- Set `width = height` for perfect circle
- Use different width/height for ellipse
- Radial gradients work beautifully

**Example:**
```json
{
  "type": "circle",
  "x": 100,
  "y": 100,
  "width": 150,
  "height": 150,
  "fill": "radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)",
  "stroke": "#d97706",
  "strokeWidth": 3
}
```

## Text Elements

**Description:** Rich text element with full typography control

**Required Properties:**
```typescript
{
  type: 'text',
  x: number,
  y: number,
  width: number,
  height: number,
  text: string  // Text content
}
```

**Typography Properties:**
- `fontSize`: Font size in pixels (common: 12, 14, 16, 18, 24, 32, 48, 64, 72, 96)
- `fontFamily`: Font family name (see fonts section)
- `fontWeight`: 100-900, 'normal', 'bold'
- `fontStyle`: 'normal', 'italic', 'oblique'
- `textAlign`: 'left', 'center', 'right', 'justify'
- `textDecoration`: 'none', 'underline', 'line-through', 'overline'
- `textTransform`: 'none', 'uppercase', 'lowercase', 'capitalize'
- `letterSpacing`: Letter spacing in pixels
- `lineHeight`: Line height multiplier (1.0 = normal, 1.5 = 150%)
- `color` or `fill`: Text color

**Text Effects:**
- `textShadow`: Shadow for depth
- `textStroke`: Outlined text effect

**Dynamic Support:** ✅ Yes
```json
{
  "type": "text",
  "text": "{{recipient_name}}",
  "isDynamic": true,
  "name": "recipient_name"
}
```

**Example:**
```json
{
  "type": "text",
  "x": 100,
  "y": 100,
  "width": 600,
  "height": 100,
  "text": "Beautiful Typography",
  "fontSize": 72,
  "fontFamily": "Montserrat",
  "fontWeight": "700",
  "fill": "#1e293b",
  "textAlign": "center",
  "textShadowX": 2,
  "textShadowY": 2,
  "textShadowBlur": 4,
  "textShadowColor": "rgba(0,0,0,0.1)"
}
```

## Image Elements

### Image (Raster)

**Description:** Raster image element (PNG, JPG, WebP, GIF)

**Required Properties:**
```typescript
{
  type: 'image',
  x: number,
  y: number,
  width: number,
  height: number,
  src: string  // Image URL
}
```

**Image Properties:**
- `objectFit`: How image fits in container
  - `'cover'`: Fill area (may crop)
  - `'contain'`: Fit entire image (may have gaps)
  - `'fill'`: Stretch to fill
  - `'none'`: Original size
  - `'scale-down'`: Smaller of contain or none
- `objectPosition`: Position within container (e.g., 'center', 'top', '50% 50%')

**Styling Capabilities:**
- ✅ Border radius
- ✅ Rotation
- ✅ Opacity
- ✅ Filters
- ✅ Box shadow
- ❌ Fill/stroke (image content)

**Dynamic Support:** ✅ Yes
```json
{
  "type": "image",
  "src": "{{profile_photo_url}}",
  "isDynamic": true,
  "name": "profile_photo"
}
```

**Example:**
```json
{
  "type": "image",
  "x": 100,
  "y": 100,
  "width": 400,
  "height": 300,
  "src": "https://example.com/photo.jpg",
  "objectFit": "cover",
  "borderRadius": 12,
  "boxShadow": "0 4px 12px rgba(0,0,0,0.15)"
}
```

### SVG (Vector)

**Description:** Vector graphic element (icons, logos, illustrations)

**Required Properties:**
```typescript
{
  type: 'svg',
  x: number,
  y: number,
  width: number,
  height: number,
  src: string  // SVG URL
}
```

**Tips:**
- Use `objectFit: 'contain'` to maintain aspect ratio
- SVGs scale perfectly at any size
- Colors are defined in the SVG file itself
- Perfect for icons from Iconify

**Example:**
```json
{
  "type": "svg",
  "x": 100,
  "y": 100,
  "width": 64,
  "height": 64,
  "src": "https://api.iconify.design/mdi/home.svg",
  "objectFit": "contain"
}
```

## Advanced Elements

### Polygon (Custom Shapes)

**Description:** Custom polygon shape (regular or custom via SVG path)

**Two Modes:**

1. **Regular Polygon:**
```json
{
  "type": "polygon",
  "x": 100,
  "y": 100,
  "width": 150,
  "height": 150,
  "polygonSides": 6,  // Hexagon
  "fill": "#8b5cf6"
}
```

2. **Custom Shape (SVG Path):**
```json
{
  "type": "polygon",
  "x": 100,
  "y": 100,
  "width": 150,
  "height": 150,
  "fill": "#8b5cf6",
  "svgPath": "M50 5 L95 38 L77 92 L23 92 L5 38 Z",
  "svgViewBox": "0 0 100 100"
}
```

**Use Cases:**
- Custom shapes from shapes library
- Geometric patterns
- Decorative elements
- Complex vector shapes

**Tip:** All shapes from the shapes library (basic, arrows, stars, callouts, nature, symbols, geometric, extra) work with polygon + svgPath!

### Star

**Description:** Star shape with configurable points and inner radius

**Properties:**
- `starPoints`: Number of points (3-20)
- `starInnerRadius`: Inner radius (0-1)
  - 0.4 = classic star shape
  - Lower values = sharper points
  - Higher values = rounder star

**Example:**
```json
{
  "type": "star",
  "x": 100,
  "y": 100,
  "width": 150,
  "height": 150,
  "fill": "#f59e0b",
  "starPoints": 5,
  "starInnerRadius": 0.4
}
```

### Table

**Description:** Data table with headers, styling, and dynamic data support

**Properties:**
- `tableRows`: Number of rows
- `tableColumns`: Number of columns
- `tableHasHeader`: Whether first row is header
- `tableHeaderBackground`: Header background color
- `tableHeaderTextColor`: Header text color
- `tableCellTextColor`: Cell text color
- `tableBorderColor`: Border color
- `tableBorderWidth`: Border width
- `tableAlternateRowColor`: Zebra striping color
- `tableCellAlignment`: 'left', 'center', 'right'

**Dynamic Support:** ✅ Yes
```json
{
  "type": "table",
  "tableIsDynamic": true,
  "tableDataSource": "csv",
  "tableCsvUrl": "{{data_url}}"
}
```

## QR Codes & Barcodes

### QR Code

**Description:** QR code generator for URLs, text, vCards, and more

**Required Properties:**
```typescript
{
  type: 'qrcode',
  x: number,
  y: number,
  width: number,
  height: number,
  qrData: string  // Data to encode
}
```

**QR Code Properties:**
- `qrData`: Content to encode (URL, text, vCard, etc.)
- `qrColor`: Foreground color (default: black)
- `qrBgColor`: Background color (default: white)
- `qrErrorLevel`: Error correction level
  - `'L'`: 7% error correction
  - `'M'`: 15% error correction (default)
  - `'Q'`: 25% error correction
  - `'H'`: 30% error correction (use for logos)
- `qrMargin`: Margin around QR code in modules (default: 4)

**Data Formats:**
- URL: `https://example.com`
- Text: Any plain text
- Email: `mailto:email@example.com`
- Phone: `tel:+1234567890`
- SMS: `sms:+1234567890?body=Hello`
- WiFi: `WIFI:T:WPA;S:NetworkName;P:Password;;`
- vCard: `BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD`

**Dynamic Support:** ✅ Yes
```json
{
  "type": "qrcode",
  "qrData": "{{ticket_url}}",
  "isDynamic": true,
  "name": "ticket_qr"
}
```

**Example:**
```json
{
  "type": "qrcode",
  "x": 100,
  "y": 100,
  "width": 200,
  "height": 200,
  "qrData": "https://canvelete.com",
  "qrColor": "#1e293b",
  "qrBgColor": "#ffffff",
  "qrErrorLevel": "M",
  "qrMargin": 4
}
```

### Barcode

**Description:** Linear barcode generator (CODE128, EAN, UPC, etc.)

**Required Properties:**
```typescript
{
  type: 'barcode',
  x: number,
  y: number,
  width: number,
  height: number,
  barcodeData: string,  // Data to encode
  barcodeFormat: string // Barcode format
}
```

**Barcode Properties:**
- `barcodeData`: Content to encode
- `barcodeFormat`: Barcode symbology
  - `'CODE128'`: Most versatile, full ASCII (general purpose)
  - `'CODE39'`: Alphanumeric (industrial, military)
  - `'EAN13'`: 13-digit European Article Number (retail)
  - `'EAN8'`: 8-digit short EAN (small products)
  - `'UPC'`: 12-digit Universal Product Code (North America)
  - `'UPCE'`: 6-8 digit compressed UPC
  - `'ITF14'`: 14-digit Interleaved 2 of 5 (shipping)
  - `'MSI'`: Numeric only (inventory, warehouse)
  - `'pharmacode'`: Pharmaceutical binary code
  - `'codabar'`: Libraries, blood banks, logistics
- `barcodeLineColor`: Bar color (default: black)
- `barcodeBackground`: Background color (default: white)
- `barcodeShowText`: Show human-readable text (default: true)
- `barcodeTextSize`: Font size for text (default: 12)
- `barcodeWidth`: Width of individual bars (default: 2)
- `barcodeHeight`: Height of bars in pixels (default: 100)

**Dynamic Support:** ✅ Yes
```json
{
  "type": "barcode",
  "barcodeData": "{{product_sku}}",
  "isDynamic": true,
  "name": "product_barcode"
}
```

**Example:**
```json
{
  "type": "barcode",
  "x": 100,
  "y": 100,
  "width": 300,
  "height": 100,
  "barcodeData": "123456789012",
  "barcodeFormat": "CODE128",
  "barcodeLineColor": "#000000",
  "barcodeBackground": "#ffffff",
  "barcodeShowText": true,
  "barcodeTextSize": 12,
  "barcodeWidth": 2,
  "barcodeHeight": 80
}
```

## Dynamic Elements

Dynamic elements use template variables that are replaced with actual data during rendering. Perfect for certificates, badges, name tags, reports, and data-driven designs.

### How to Create Dynamic Elements

**Text Elements:**
```json
{
  "type": "text",
  "text": "{{recipient_name}}",
  "isDynamic": true,
  "name": "recipient_name"
}
```

**Image Elements:**
```json
{
  "type": "image",
  "src": "{{profile_photo_url}}",
  "isDynamic": true,
  "name": "profile_photo"
}
```

**QR Code Elements:**
```json
{
  "type": "qrcode",
  "qrData": "{{ticket_url}}",
  "isDynamic": true,
  "name": "ticket_qr"
}
```

**Barcode Elements:**
```json
{
  "type": "barcode",
  "barcodeData": "{{product_sku}}",
  "isDynamic": true,
  "name": "product_barcode"
}
```

**Table Elements:**
```json
{
  "type": "table",
  "tableIsDynamic": true,
  "tableDataSource": "csv",
  "tableCsvUrl": "{{data_url}}"
}
```

### Common Variable Names

**Certificates:**
- `recipient_name`, `award_title`, `award_date`, `issuer_name`
- `certificate_number`, `achievement_description`, `signature_url`

**Badges:**
- `attendee_name`, `event_name`, `event_date`, `company_name`
- `role_title`, `badge_number`, `photo_url`

**Name Tags:**
- `full_name`, `first_name`, `last_name`, `job_title`
- `department`, `company_name`, `photo_url`

## Styling Capabilities Matrix

Quick reference for which styling properties work with which element types:

| Property | Supported Elements | Notes |
|----------|-------------------|-------|
| `fill` | rectangle, circle, polygon, star, bezier, container, table | Text uses `color` or `fill` |
| `stroke` | rectangle, circle, line, polygon, star, bezier, container, table | Border/outline |
| `borderRadius` | rectangle, image, container | Rounded corners |
| `rotation` | **All elements** | Rotate around center |
| `opacity` | **All elements** | 0 (invisible) to 1 (visible) |
| `filters` | rectangle, circle, text, image, polygon, star, container | blur, brightness, etc. |
| `boxShadow` | rectangle, image, container | Drop shadow |
| `gradients` | rectangle, circle, polygon, star, bezier, container | In `fill` property |
| `textShadow` | text | Text-specific shadow |
| `objectFit` | image, svg | How content fits |

## Best Practices

### Typography
- Limit to 2-3 fonts per design
- Use font weight/size variation instead of many fonts
- Ensure sufficient contrast for readability
- Common heading sizes: 48-72px, body: 14-18px

### Colors
- Use a consistent color palette (3-5 colors)
- Include brand colors for consistency
- Use transparency for subtle effects
- Consider accessibility (sufficient contrast)

### Spacing
- Use consistent margins and padding
- Common spacing values: 8, 16, 24, 32, 48, 64 pixels
- Leave breathing room around text
- Align elements to a grid when possible

### Certificates
- Place recipient name prominently in center
- Use elegant fonts like Playfair Display, Great Vibes
- Include decorative borders and corners
- Add official elements: seal, signature, certificate number
- Mark dynamic fields with `isDynamic: true`

### Badges
- Keep design simple and readable at small sizes
- Include essential info: name, event, role
- Add photo placeholder if needed
- Consider QR code for verification
- Use high contrast for readability

## Getting Help

For more information:
- Check the metadata resource: `canvelete://api/metadata/schema`
- Use the `list_fonts` tool to see available fonts
- Use the `list_shapes` tool to see available shapes
- Search for assets using `search_stock_images`, `search_icons`, `search_clipart`, `search_illustrations`
