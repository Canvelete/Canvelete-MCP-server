/**
 * Comprehensive Element Capabilities Documentation
 * 
 * This file provides detailed information about what each element type can do,
 * their styling limits, and best practices for using them effectively.
 */

export const ELEMENT_CAPABILITIES = {
    version: '1.0.0',
    description: 'Complete guide to element types, their capabilities, and styling limits',

    // ==========================================================================
    // ELEMENT TYPE CAPABILITIES
    // ==========================================================================
    
    elementTypes: {
        rectangle: {
            name: 'Rectangle',
            description: 'Versatile rectangular shape with rounded corners support',
            capabilities: {
                fill: true,
                stroke: true,
                borderRadius: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                gradients: true,
            },
            limitations: {
                text: false,
                imageContent: false,
            },
            commonUses: [
                'Backgrounds and containers',
                'Buttons and UI elements',
                'Frames and borders',
                'Color blocks and dividers',
            ],
            stylingTips: [
                'Use borderRadius for rounded corners (0-50% of smallest dimension)',
                'Combine with gradients for modern looks',
                'Apply boxShadow for depth',
                'Use stroke for outlined rectangles',
            ],
            example: {
                type: 'rectangle',
                x: 100,
                y: 100,
                width: 300,
                height: 200,
                fill: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 16,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            },
        },

        circle: {
            name: 'Circle / Ellipse',
            description: 'Circular or elliptical shape (width = height for perfect circle)',
            capabilities: {
                fill: true,
                stroke: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                gradients: true,
            },
            limitations: {
                borderRadius: false,
                text: false,
                imageContent: false,
            },
            commonUses: [
                'Avatars and profile pictures (as mask)',
                'Decorative elements',
                'Icons and badges',
                'Dots and indicators',
            ],
            stylingTips: [
                'Set width = height for perfect circle',
                'Use different width/height for ellipse',
                'Radial gradients work beautifully',
                'Combine multiple circles for complex shapes',
            ],
            example: {
                type: 'circle',
                x: 100,
                y: 100,
                width: 150,
                height: 150,
                fill: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)',
                stroke: '#d97706',
                strokeWidth: 3,
            },
        },

        text: {
            name: 'Text',
            description: 'Rich text element with full typography control',
            capabilities: {
                fill: true,
                stroke: false,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                textShadow: true,
                textStroke: true,
                typography: true,
                multiline: true,
                dynamicContent: true,
            },
            limitations: {
                borderRadius: false,
                boxShadow: false,
            },
            commonUses: [
                'Headlines and titles',
                'Body text and paragraphs',
                'Labels and captions',
                'Dynamic template fields',
            ],
            stylingTips: [
                'Use appropriate fontSize (headlines: 48-96px, body: 14-18px)',
                'Choose fontFamily from available fonts',
                'Set lineHeight for multi-line text (1.2-1.8)',
                'Use textAlign for alignment within text box',
                'Apply textShadow for depth',
                'Use textStroke for outlined text',
            ],
            dynamicSupport: {
                enabled: true,
                usage: 'Set isDynamic: true and use {{variable_name}} in text',
                example: {
                    type: 'text',
                    text: '{{recipient_name}}',
                    isDynamic: true,
                    name: 'recipient_name',
                },
            },
            example: {
                type: 'text',
                x: 100,
                y: 100,
                width: 600,
                height: 100,
                text: 'Beautiful Typography',
                fontSize: 72,
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fill: '#1e293b',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            },
        },

        image: {
            name: 'Image',
            description: 'Raster image element (PNG, JPG, WebP, GIF)',
            capabilities: {
                fill: false,
                stroke: false,
                borderRadius: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                objectFit: true,
                dynamicContent: true,
            },
            limitations: {
                gradients: false,
                textContent: false,
            },
            commonUses: [
                'Photos and illustrations',
                'Product images',
                'Background images',
                'Dynamic user photos',
            ],
            stylingTips: [
                'Use objectFit: "cover" to fill area (may crop)',
                'Use objectFit: "contain" to fit entire image (may have gaps)',
                'Apply borderRadius for rounded images',
                'Use filters for effects (blur, brightness, etc.)',
            ],
            dynamicSupport: {
                enabled: true,
                usage: 'Set isDynamic: true and use {{variable_name}} in src',
                example: {
                    type: 'image',
                    src: '{{profile_photo_url}}',
                    isDynamic: true,
                    name: 'profile_photo',
                },
            },
            example: {
                type: 'image',
                x: 100,
                y: 100,
                width: 400,
                height: 300,
                src: 'https://example.com/photo.jpg',
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
        },

        svg: {
            name: 'SVG',
            description: 'Vector graphic element (icons, logos, illustrations)',
            capabilities: {
                fill: false,
                stroke: false,
                rotation: true,
                opacity: true,
                filters: true,
                objectFit: true,
            },
            limitations: {
                borderRadius: false,
                shadow: false,
                fillOverride: false,
            },
            commonUses: [
                'Icons from Iconify',
                'Logos and brand marks',
                'Vector illustrations',
                'Scalable graphics',
            ],
            stylingTips: [
                'Use objectFit: "contain" to maintain aspect ratio',
                'SVGs scale perfectly at any size',
                'Colors are defined in the SVG file itself',
                'Use filters for color adjustments',
            ],
            example: {
                type: 'svg',
                x: 100,
                y: 100,
                width: 64,
                height: 64,
                src: 'https://api.iconify.design/mdi/home.svg',
                objectFit: 'contain',
            },
        },

        line: {
            name: 'Line',
            description: 'Straight or multi-point line element',
            capabilities: {
                fill: false,
                stroke: true,
                rotation: true,
                opacity: true,
                lineCap: true,
                lineDash: true,
                multiPoint: true,
            },
            limitations: {
                borderRadius: false,
                shadow: false,
                filters: false,
            },
            commonUses: [
                'Dividers and separators',
                'Underlines and borders',
                'Connecting elements',
                'Decorative lines',
            ],
            stylingTips: [
                'Use strokeWidth to control thickness',
                'Set lineCap: "round" for rounded ends',
                'Use lineDash for dashed/dotted lines (e.g., "5,5")',
                'Add linePoints for polylines',
            ],
            example: {
                type: 'line',
                x: 100,
                y: 100,
                width: 400,
                height: 2,
                stroke: '#64748b',
                strokeWidth: 2,
                lineCap: 'round',
            },
        },

        polygon: {
            name: 'Polygon',
            description: 'Custom polygon shape (regular or custom via SVG path)',
            capabilities: {
                fill: true,
                stroke: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                gradients: true,
                customPath: true,
            },
            limitations: {
                borderRadius: false,
                text: false,
            },
            commonUses: [
                'Custom shapes from shapes library',
                'Geometric patterns',
                'Decorative elements',
                'Complex vector shapes',
            ],
            stylingTips: [
                'Use polygonSides for regular polygons (3=triangle, 5=pentagon, etc.)',
                'Use svgPath + svgViewBox for custom shapes',
                'All shapes from the shapes library work here',
                'Apply gradients for stunning effects',
            ],
            example: {
                type: 'polygon',
                x: 100,
                y: 100,
                width: 150,
                height: 150,
                fill: '#8b5cf6',
                stroke: '#7c3aed',
                strokeWidth: 2,
                svgPath: 'M50 5 L95 38 L77 92 L23 92 L5 38 Z',
                svgViewBox: '0 0 100 100',
            },
        },

        star: {
            name: 'Star',
            description: 'Star shape with configurable points and inner radius',
            capabilities: {
                fill: true,
                stroke: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                gradients: true,
                configurablePoints: true,
            },
            limitations: {
                borderRadius: false,
                text: false,
            },
            commonUses: [
                'Ratings and reviews',
                'Badges and awards',
                'Decorative elements',
                'Icons and symbols',
            ],
            stylingTips: [
                'Set starPoints for number of points (3-20)',
                'Use starInnerRadius to control point depth (0-1)',
                'starInnerRadius: 0.4 gives classic star shape',
                'Lower values create sharper points',
            ],
            example: {
                type: 'star',
                x: 100,
                y: 100,
                width: 150,
                height: 150,
                fill: '#f59e0b',
                starPoints: 5,
                starInnerRadius: 0.4,
            },
        },

        qr: {
            name: 'QR Code',
            description: 'QR code generator for URLs, text, vCards, and more',
            capabilities: {
                fill: false,
                stroke: false,
                rotation: true,
                opacity: true,
                customColors: true,
                errorCorrection: true,
                dynamicContent: true,
            },
            limitations: {
                borderRadius: false,
                filters: false,
                shadow: false,
                gradients: false,
            },
            commonUses: [
                'Website URLs and links',
                'Contact information (vCard)',
                'Event tickets and passes',
                'Product information',
                'WiFi credentials',
            ],
            stylingTips: [
                'Use qrValue for the content to encode',
                'Set qrColor for foreground (default: black)',
                'Set qrBgColor for background (default: white)',
                'Use qrErrorLevel: "H" for logos/damage resistance',
                'Ensure sufficient contrast for scanning',
            ],
            dynamicSupport: {
                enabled: true,
                usage: 'Set isDynamic: true and use {{variable_name}} in qrValue',
                example: {
                    type: 'qr',
                    qrValue: '{{ticket_url}}',
                    isDynamic: true,
                    name: 'ticket_qr',
                },
            },
            dataFormats: {
                url: 'https://example.com',
                text: 'Any plain text',
                email: 'mailto:email@example.com',
                phone: 'tel:+1234567890',
                sms: 'sms:+1234567890?body=Hello',
                wifi: 'WIFI:T:WPA;S:NetworkName;P:Password;;',
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD',
            },
            example: {
                type: 'qr',
                x: 100,
                y: 100,
                width: 200,
                height: 200,
                qrValue: 'https://canvelete.com',
                qrColor: '#1e293b',
                qrBgColor: '#ffffff',
                qrErrorLevel: 'M',
                qrMargin: 1,
            },
        },

        barcode: {
            name: 'Barcode',
            description: 'Linear barcode generator (CODE128, EAN, UPC, etc.)',
            capabilities: {
                fill: false,
                stroke: false,
                rotation: true,
                opacity: true,
                customColors: true,
                multipleFormats: true,
                humanReadable: true,
                dynamicContent: true,
            },
            limitations: {
                borderRadius: false,
                filters: false,
                shadow: false,
                gradients: false,
            },
            commonUses: [
                'Product barcodes (EAN, UPC)',
                'Inventory tracking',
                'Shipping labels',
                'Tickets and passes',
                'Asset management',
            ],
            stylingTips: [
                'Use barcodeValue for the content to encode',
                'Choose appropriate barcodeFormat for your use case',
                'Set barcodeLineColor for bars (default: black)',
                'Set barcodeBackground for background (default: transparent)',
                'Use barcodeShowText: true to display human-readable text',
                'Use barcodeFontSize to control text size (default: 20)',
            ],
            dynamicSupport: {
                enabled: true,
                usage: 'Set isDynamic: true and use {{variable_name}} in barcodeValue',
                example: {
                    type: 'barcode',
                    barcodeValue: '{{product_sku}}',
                    isDynamic: true,
                    name: 'product_barcode',
                },
            },
            formats: {
                CODE128: {
                    description: 'Most versatile, supports full ASCII',
                    dataLength: 'Variable',
                    useCase: 'General purpose, shipping, inventory',
                },
                CODE39: {
                    description: 'Alphanumeric, widely used',
                    dataLength: 'Variable',
                    useCase: 'Industrial, military, healthcare',
                },
                EAN13: {
                    description: 'European Article Number (13 digits)',
                    dataLength: '13 digits',
                    useCase: 'Retail products worldwide',
                },
                EAN8: {
                    description: 'Short EAN for small products',
                    dataLength: '8 digits',
                    useCase: 'Small retail items',
                },
                UPC: {
                    description: 'Universal Product Code (12 digits)',
                    dataLength: '12 digits',
                    useCase: 'Retail products in North America',
                },
                UPCE: {
                    description: 'Compressed UPC',
                    dataLength: '6-8 digits',
                    useCase: 'Small retail items',
                },
                ITF14: {
                    description: 'Interleaved 2 of 5 (14 digits)',
                    dataLength: '14 digits',
                    useCase: 'Shipping containers, cartons',
                },
                MSI: {
                    description: 'Modified Plessey, numeric only',
                    dataLength: 'Variable',
                    useCase: 'Inventory, warehouse',
                },
                pharmacode: {
                    description: 'Pharmaceutical binary code',
                    dataLength: '3-131070',
                    useCase: 'Pharmaceutical packaging',
                },
                codabar: {
                    description: 'Numeric + special characters',
                    dataLength: 'Variable',
                    useCase: 'Libraries, blood banks, logistics',
                },
            },
            example: {
                type: 'barcode',
                x: 100,
                y: 100,
                width: 300,
                height: 100,
                barcodeValue: '123456789012',
                barcodeFormat: 'CODE128',
                barcodeLineColor: '#000000',
                barcodeBackground: 'transparent',
                barcodeShowText: true,
                barcodeFontSize: 20,
                barcodeTextMargin: 2,
                barcodeTextAlign: 'center',
            },
        },

        table: {
            name: 'Table',
            description: 'Data table with headers, styling, and dynamic data support',
            capabilities: {
                fill: true,
                stroke: true,
                rotation: true,
                opacity: true,
                headers: true,
                cellStyling: true,
                dynamicData: true,
            },
            limitations: {
                borderRadius: false,
                filters: false,
                shadow: false,
            },
            commonUses: [
                'Data tables and reports',
                'Price lists',
                'Schedules and timetables',
                'Comparison charts',
            ],
            stylingTips: [
                'Set tableRows and tableColumns',
                'Use tableHasHeader for header row',
                'Style with tableHeaderBackground, tableCellTextColor',
                'Set tableCellAlignment for text alignment',
                'Use tableAlternateRowColor for zebra striping',
            ],
            dynamicSupport: {
                enabled: true,
                usage: 'Set tableIsDynamic: true and provide data source',
                example: {
                    type: 'table',
                    tableIsDynamic: true,
                    tableDataSource: 'csv',
                    tableCsvUrl: '{{data_url}}',
                },
            },
            example: {
                type: 'table',
                x: 100,
                y: 100,
                width: 600,
                height: 400,
                tableRows: 5,
                tableColumns: 3,
                tableHasHeader: true,
                tableHeaderBackground: '#1e293b',
                tableHeaderTextColor: '#ffffff',
                tableCellTextColor: '#334155',
                tableBorderColor: '#cbd5e1',
                tableBorderWidth: 1,
                tableAlternateRowColor: '#f8fafc',
            },
        },

        container: {
            name: 'Container',
            description: 'Layout container for grouping elements',
            capabilities: {
                fill: true,
                stroke: true,
                borderRadius: true,
                rotation: true,
                opacity: true,
                filters: true,
                shadow: true,
                padding: true,
                backdropBlur: true,
            },
            limitations: {
                text: false,
                imageContent: false,
            },
            commonUses: [
                'Grouping related elements',
                'Card-like containers',
                'Sections and panels',
                'Glassmorphism effects',
            ],
            stylingTips: [
                'Use padding for internal spacing',
                'Apply backdropBlur for glassmorphism',
                'Combine with semi-transparent fill',
                'Use boxShadow for elevation',
            ],
            example: {
                type: 'container',
                x: 100,
                y: 100,
                width: 400,
                height: 300,
                fill: 'rgba(255, 255, 255, 0.1)',
                backdropBlur: 10,
                borderRadius: 16,
                stroke: 'rgba(255, 255, 255, 0.2)',
                strokeWidth: 1,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            },
        },

        bezier: {
            name: 'Bezier Curve',
            description: 'Smooth curved path using bezier control points',
            capabilities: {
                fill: true,
                stroke: true,
                rotation: true,
                opacity: true,
                customPath: true,
            },
            limitations: {
                borderRadius: false,
                filters: false,
                shadow: false,
            },
            commonUses: [
                'Organic shapes',
                'Flowing lines',
                'Custom curves',
                'Decorative elements',
            ],
            stylingTips: [
                'Define bezierPoints for curve path',
                'Use stroke for line curves',
                'Use fill for closed shapes',
                'Combine multiple curves for complex shapes',
            ],
            example: {
                type: 'bezier',
                x: 100,
                y: 100,
                width: 300,
                height: 200,
                stroke: '#6366f1',
                strokeWidth: 3,
                fill: 'none',
                bezierPoints: [
                    { x: 0, y: 100 },
                    { x: 150, y: 0 },
                    { x: 300, y: 100 },
                ],
            },
        },
    },

    // ==========================================================================
    // STYLING CAPABILITIES MATRIX
    // ==========================================================================
    
    stylingMatrix: {
        description: 'Quick reference for which styling properties work with which element types',
        
        properties: {
            fill: {
                supported: ['rectangle', 'circle', 'polygon', 'star', 'bezier', 'container', 'table'],
                notSupported: ['text', 'image', 'svg', 'line', 'qr', 'barcode'],
                note: 'Text uses "color" or "fill" for text color',
            },
            stroke: {
                supported: ['rectangle', 'circle', 'line', 'polygon', 'star', 'bezier', 'container', 'table'],
                notSupported: ['text', 'image', 'svg', 'qr', 'barcode'],
            },
            borderRadius: {
                supported: ['rectangle', 'image', 'container'],
                notSupported: ['circle', 'text', 'svg', 'line', 'polygon', 'star', 'bezier', 'table', 'qr', 'barcode'],
            },
            rotation: {
                supported: 'all',
                note: 'All elements support rotation',
            },
            opacity: {
                supported: 'all',
                note: 'All elements support opacity',
            },
            filters: {
                supported: ['rectangle', 'circle', 'text', 'image', 'polygon', 'star', 'container'],
                notSupported: ['svg', 'line', 'bezier', 'table', 'qr', 'barcode'],
                note: 'Filters include blur, brightness, contrast, saturate, hueRotate',
            },
            boxShadow: {
                supported: ['rectangle', 'image', 'container'],
                notSupported: ['circle', 'text', 'svg', 'line', 'polygon', 'star', 'bezier', 'table', 'qr', 'barcode'],
                note: 'Text uses textShadow instead',
            },
            gradients: {
                supported: ['rectangle', 'circle', 'polygon', 'star', 'bezier', 'container'],
                notSupported: ['text', 'image', 'svg', 'line', 'table', 'qr', 'barcode'],
                note: 'Use in fill property: linear-gradient() or radial-gradient()',
            },
        },
    },

    // ==========================================================================
    // DYNAMIC ELEMENT SUPPORT
    // ==========================================================================
    
    dynamicSupport: {
        description: 'Elements that support dynamic/template variables',
        
        supported: {
            text: {
                property: 'text',
                usage: 'Use {{variable_name}} in text content',
                example: '{{recipient_name}}',
            },
            image: {
                property: 'src',
                usage: 'Use {{variable_name}} in image URL',
                example: '{{profile_photo_url}}',
            },
            qr: {
                property: 'qrValue',
                usage: 'Use {{variable_name}} in QR code data',
                example: '{{ticket_url}}',
            },
            barcode: {
                property: 'barcodeValue',
                usage: 'Use {{variable_name}} in barcode data',
                example: '{{product_sku}}',
            },
            table: {
                property: 'tableDataSource',
                usage: 'Set tableIsDynamic: true and provide data source',
                example: 'tableCsvUrl: "{{data_url}}"',
            },
        },
        
        howToMakeDynamic: {
            step1: 'Set isDynamic: true on the element',
            step2: 'Use {{variable_name}} syntax in the appropriate property',
            step3: 'Give the element a meaningful name matching the variable',
            step4: 'When rendering, provide actual values for variables',
        },
    },

    // ==========================================================================
    // COMMON PATTERNS AND RECIPES
    // ==========================================================================
    
    commonPatterns: {
        certificate: {
            description: 'Certificate design pattern',
            elements: [
                { type: 'rectangle', purpose: 'Background', styling: 'fill with gradient or color' },
                { type: 'polygon', purpose: 'Decorative borders', styling: 'use shapes library patterns' },
                { type: 'text', purpose: 'Title', styling: 'large elegant font (Playfair Display)' },
                { type: 'text', purpose: 'Recipient name', styling: 'dynamic, prominent, centered' },
                { type: 'text', purpose: 'Award details', styling: 'medium size, readable font' },
                { type: 'image', purpose: 'Seal/logo', styling: 'circular or badge-like' },
                { type: 'text', purpose: 'Date', styling: 'small, subtle' },
            ],
        },
        badge: {
            description: 'Event badge / name tag pattern',
            elements: [
                { type: 'rectangle', purpose: 'Background', styling: 'brand colors' },
                { type: 'image', purpose: 'Photo', styling: 'circular with borderRadius' },
                { type: 'text', purpose: 'Name', styling: 'large, bold, dynamic' },
                { type: 'text', purpose: 'Title/Role', styling: 'medium, secondary color' },
                { type: 'text', purpose: 'Company', styling: 'small, subtle' },
                { type: 'qrcode', purpose: 'Check-in code', styling: 'corner placement' },
            ],
        },
        socialPost: {
            description: 'Social media post pattern',
            elements: [
                { type: 'image', purpose: 'Background', styling: 'full canvas, objectFit: cover' },
                { type: 'rectangle', purpose: 'Overlay', styling: 'semi-transparent for text readability' },
                { type: 'text', purpose: 'Headline', styling: 'large, bold, high contrast' },
                { type: 'text', purpose: 'Subtext', styling: 'medium, complementary' },
                { type: 'image', purpose: 'Logo', styling: 'corner placement, small' },
            ],
        },
    },
};
