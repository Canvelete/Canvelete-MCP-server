// SVG Shapes library for MCP server
// Provides all available shapes that can be used with add_element tool

export interface Shape {
    id: string;
    name: string;
    svgPath: string;
    viewBox: string;
    useCase?: string;
}

export interface ShapeCategory {
    label: string;
    description?: string;
    shapes: Shape[];
    tips?: string[];
}

export const SVG_SHAPES: Record<string, ShapeCategory> = {
    basic: {
        label: 'Basic Shapes',
        shapes: [
            { id: 'triangle', name: 'Triangle', svgPath: 'M50 10 L90 90 L10 90 Z', viewBox: '0 0 100 100' },
            { id: 'pentagon', name: 'Pentagon', svgPath: 'M50 5 L95 38 L77 92 L23 92 L5 38 Z', viewBox: '0 0 100 100' },
            { id: 'hexagon', name: 'Hexagon', svgPath: 'M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z', viewBox: '0 0 100 100' },
            { id: 'octagon', name: 'Octagon', svgPath: 'M30 5 L70 5 L95 30 L95 70 L70 95 L30 95 L5 70 L5 30 Z', viewBox: '0 0 100 100' },
            { id: 'diamond', name: 'Diamond', svgPath: 'M50 5 L95 50 L50 95 L5 50 Z', viewBox: '0 0 100 100' },
            { id: 'parallelogram', name: 'Parallelogram', svgPath: 'M25 10 L95 10 L75 90 L5 90 Z', viewBox: '0 0 100 100' },
            { id: 'trapezoid', name: 'Trapezoid', svgPath: 'M20 20 L80 20 L95 80 L5 80 Z', viewBox: '0 0 100 100' },
            { id: 'rounded-rect', name: 'Rounded Rectangle', svgPath: 'M20 10 Q10 10 10 20 L10 80 Q10 90 20 90 L80 90 Q90 90 90 80 L90 20 Q90 10 80 10 Z', viewBox: '0 0 100 100' },
            { id: 'ellipse-horizontal', name: 'Ellipse Horizontal', svgPath: 'M50 10 C80 10 90 25 90 50 C90 75 80 90 50 90 C20 90 10 75 10 50 C10 25 20 10 50 10 Z', viewBox: '0 0 100 100' },
            { id: 'ticket', name: 'Ticket', svgPath: 'M10 20 L30 20 Q30 10 40 10 L60 10 Q70 10 70 20 L90 20 L90 80 L70 80 Q70 90 60 90 L40 90 Q30 90 30 80 L10 80 Z', viewBox: '0 0 100 100' },
        ],
    },
    arrows: {
        label: 'Arrows & Pointers',
        shapes: [
            { id: 'arrow-right', name: 'Arrow Right', svgPath: 'M10 40 L60 40 L60 20 L90 50 L60 80 L60 60 L10 60 Z', viewBox: '0 0 100 100' },
            { id: 'arrow-left', name: 'Arrow Left', svgPath: 'M90 40 L40 40 L40 20 L10 50 L40 80 L40 60 L90 60 Z', viewBox: '0 0 100 100' },
            { id: 'arrow-up', name: 'Arrow Up', svgPath: 'M40 90 L40 40 L20 40 L50 10 L80 40 L60 40 L60 90 Z', viewBox: '0 0 100 100' },
            { id: 'arrow-down', name: 'Arrow Down', svgPath: 'M40 10 L40 60 L20 60 L50 90 L80 60 L60 60 L60 10 Z', viewBox: '0 0 100 100' },
            { id: 'chevron-right', name: 'Chevron Right', svgPath: 'M30 10 L70 50 L30 90 L20 80 L50 50 L20 20 Z', viewBox: '0 0 100 100' },
            { id: 'double-arrow', name: 'Double Arrow', svgPath: 'M10 50 L30 30 L30 42 L70 42 L70 30 L90 50 L70 70 L70 58 L30 58 L30 70 Z', viewBox: '0 0 100 100' },
        ],
    },
    stars: {
        label: 'Stars & Badges',
        shapes: [
            { id: 'star-4', name: '4-Point Star', svgPath: 'M50 5 L57 43 L95 50 L57 57 L50 95 L43 57 L5 50 L43 43 Z', viewBox: '0 0 100 100' },
            { id: 'star-5', name: '5-Point Star', svgPath: 'M50 5 L61 35 L95 35 L68 57 L79 90 L50 70 L21 90 L32 57 L5 35 L39 35 Z', viewBox: '0 0 100 100' },
            { id: 'star-6', name: '6-Point Star', svgPath: 'M50 5 L58 30 L85 30 L65 50 L85 70 L58 70 L50 95 L42 70 L15 70 L35 50 L15 30 L42 30 Z', viewBox: '0 0 100 100' },
            { id: 'burst', name: 'Burst', svgPath: 'M50 5 L54 38 L85 15 L62 42 L95 50 L62 58 L85 85 L54 62 L50 95 L46 62 L15 85 L38 58 L5 50 L38 42 L15 15 L46 38 Z', viewBox: '0 0 100 100' },
            { id: 'badge', name: 'Badge', svgPath: 'M50 5 L58 18 L75 12 L72 30 L90 40 L75 52 L80 70 L62 68 L50 85 L38 68 L20 70 L25 52 L10 40 L28 30 L25 12 L42 18 Z', viewBox: '0 0 100 100' },
            { id: 'ribbon', name: 'Ribbon Banner', svgPath: 'M5 25 L95 25 L95 65 L50 85 L5 65 Z', viewBox: '0 0 100 100' },
        ],
    },
    callouts: {
        label: 'Callouts & Speech',
        shapes: [
            { id: 'speech-bubble', name: 'Speech Bubble', svgPath: 'M10 10 L90 10 L90 55 L45 55 L25 80 L30 55 L10 55 Z', viewBox: '0 0 100 100' },
            { id: 'speech-bubble-round', name: 'Speech Bubble Rounded', svgPath: 'M20 20 Q10 20 10 35 L10 65 Q10 80 20 80 L60 80 L60 95 L75 80 L80 80 Q90 80 90 65 L90 35 Q90 20 80 20 Z', viewBox: '0 0 100 100' },
            { id: 'thought-cloud', name: 'Thought Cloud', svgPath: 'M25 60 C10 60 10 45 20 40 C15 30 25 20 40 20 C45 10 65 10 75 20 C90 20 95 35 85 45 C95 55 85 70 70 65 L65 65 C55 75 35 75 25 60 Z M30 75 L25 85 M20 82 L15 92', viewBox: '0 0 100 100' },
            { id: 'callout-rect', name: 'Callout Rectangle', svgPath: 'M5 5 L95 5 L95 60 L60 60 L50 85 L40 60 L5 60 Z', viewBox: '0 0 100 100' },
        ],
    },
    nature: {
        label: 'Nature & Weather',
        shapes: [
            { id: 'cloud', name: 'Cloud', svgPath: 'M25 70 L25 70 C10 70 5 55 20 50 C15 35 30 25 45 30 C50 15 75 15 80 30 C95 30 95 50 80 55 C90 70 75 75 60 70 Z', viewBox: '0 0 100 100' },
            { id: 'sun', name: 'Sun', svgPath: 'M50 35 L50 35 L65 35 L65 65 L35 65 L35 35 L50 35 M50 5 L50 20 M50 80 L50 95 M5 50 L20 50 M80 50 L95 50 M15 15 L27 27 M73 73 L85 85 M85 15 L73 27 M27 73 L15 85', viewBox: '0 0 100 100' },
            { id: 'moon', name: 'Moon', svgPath: 'M40 10 C20 20 10 40 10 60 C10 80 30 95 55 95 C75 95 90 80 90 60 C90 45 80 30 65 20 C75 30 80 45 75 60 C70 75 55 80 45 75 C35 70 30 55 35 40 C38 30 40 20 40 10 Z', viewBox: '0 0 100 100' },
            { id: 'lightning', name: 'Lightning', svgPath: 'M60 5 L25 50 L45 50 L40 95 L75 45 L55 45 Z', viewBox: '0 0 100 100' },
            { id: 'droplet', name: 'Droplet', svgPath: 'M50 5 L50 5 L75 50 C85 65 80 85 65 90 C55 95 45 95 35 90 C20 85 15 65 25 50 Z', viewBox: '0 0 100 100' },
            { id: 'flame', name: 'Flame', svgPath: 'M50 5 L50 5 C65 20 80 40 75 60 C70 80 60 95 50 95 C40 95 30 80 25 60 C20 40 35 20 50 5 M50 40 C45 50 40 60 45 70 C48 78 52 78 55 70 C60 60 55 50 50 40 Z', viewBox: '0 0 100 100' },
            { id: 'leaf', name: 'Leaf', svgPath: 'M50 95 L50 55 C25 55 10 30 50 5 C90 30 75 55 50 55 L50 95 M50 55 L30 35', viewBox: '0 0 100 100' },
        ],
    },
    symbols: {
        label: 'Symbols',
        shapes: [
            { id: 'heart', name: 'Heart', svgPath: 'M50 30 C50 20 40 10 25 10 C10 10 5 25 5 35 C5 60 50 90 50 90 C50 90 95 60 95 35 C95 25 90 10 75 10 C60 10 50 20 50 30 Z', viewBox: '0 0 100 100' },
            { id: 'shield', name: 'Shield', svgPath: 'M50 5 L90 20 L90 55 C90 75 70 90 50 95 C30 90 10 75 10 55 L10 20 Z', viewBox: '0 0 100 100' },
            { id: 'location-pin', name: 'Location Pin', svgPath: 'M50 95 C20 60 10 50 10 35 C10 15 27 5 50 5 C73 5 90 15 90 35 C90 50 80 60 50 95 Z M50 50 A15 15 0 1 1 50 20 A15 15 0 1 1 50 50 Z', viewBox: '0 0 100 100' },
            { id: 'cross', name: 'Cross', svgPath: 'M35 5 L65 5 L65 35 L95 35 L95 65 L65 65 L65 95 L35 95 L35 65 L5 65 L5 35 L35 35 Z', viewBox: '0 0 100 100' },
            { id: 'x-mark', name: 'X Mark', svgPath: 'M15 5 L50 40 L85 5 L95 15 L60 50 L95 85 L85 95 L50 60 L15 95 L5 85 L40 50 L5 15 Z', viewBox: '0 0 100 100' },
            { id: 'check', name: 'Checkmark', svgPath: 'M10 55 L20 45 L40 65 L80 25 L90 35 L40 85 Z', viewBox: '0 0 100 100' },
            { id: 'infinity', name: 'Infinity', svgPath: 'M30 50 C30 35 15 35 15 50 C15 65 30 65 50 50 C70 35 85 35 85 50 C85 65 70 65 70 50 C70 35 55 35 50 50 C45 65 30 65 30 50 Z', viewBox: '0 0 100 100' },
        ],
    },
    geometric: {
        label: 'Geometric',
        shapes: [
            { id: 'ring', name: 'Ring', svgPath: 'M50 5 L65 5 L80 15 L90 30 L95 50 L90 70 L80 85 L65 95 L50 95 L35 95 L20 85 L10 70 L5 50 L10 30 L20 15 L35 5 Z M50 25 L60 25 L70 30 L75 40 L75 50 L75 60 L70 70 L60 75 L50 75 L40 75 L30 70 L25 60 L25 50 L25 40 L30 30 L40 25 Z', viewBox: '0 0 100 100' },
            { id: 'half-circle', name: 'Half Circle', svgPath: 'M5 60 L15 40 L30 25 L50 20 L70 25 L85 40 L95 60 Z', viewBox: '0 0 100 100' },
            { id: 'quarter-circle', name: 'Quarter Circle', svgPath: 'M10 90 L10 10 L20 10 L35 15 L50 25 L65 40 L80 60 L90 90 Z', viewBox: '0 0 100 100' },
            { id: 'arc', name: 'Arc', svgPath: 'M5 85 L15 60 L30 40 L50 30 L70 40 L85 60 L95 85 L80 75 L65 55 L50 50 L35 55 L20 75 Z', viewBox: '0 0 100 100' },
            { id: 'wave', name: 'Wave', svgPath: 'M0 50 L10 35 L25 30 L40 40 L50 50 L60 60 L75 70 L90 65 L100 50 L100 95 L0 95 Z', viewBox: '0 0 100 100' },
            { id: 'cylinder', name: 'Cylinder', svgPath: 'M15 25 L30 15 L50 10 L70 15 L85 25 L85 75 L70 85 L50 90 L30 85 L15 75 Z M15 25 L30 35 L50 40 L70 35 L85 25', viewBox: '0 0 100 100' },
        ],
    },

    // Extra Shapes - Advanced patterns, tiles, and decorative elements
    extra: {
        label: 'Extra Shapes',
        description: 'Advanced SVG shapes for patterns, tiles, backgrounds, textures, borders, and decorative fills. These shapes can be used as standalone elements, repeated for seamless patterns, or combined creatively.',
        shapes: [
            { id: 'pattern-1', name: 'Clover Pattern', svgPath: 'M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z', viewBox: '0 0 256 256', useCase: 'Decorative backgrounds, elegant patterns, Celtic-inspired designs' },
            { id: 'pattern-2', name: 'Pinwheel', svgPath: 'M 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 128 128 128 L 128 64 C 163.346 64 192 35.346 192 0 Z', viewBox: '0 0 256 256', useCase: 'Dynamic backgrounds, spinning/motion effects' },
            { id: 'pattern-3', name: 'Wave Curves', svgPath: 'M 128 128 C 198.692 128 256 185.308 256 256 L 192 256 C 192 220.654 163.346 192 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 L 64 0 C 64 35.346 92.654 64 128 64 C 163.346 64 192 35.346 192 0 Z', viewBox: '0 0 256 256', useCase: 'Flowing backgrounds, water/wave themes' },
            { id: 'pattern-4', name: 'Spiral Corners', svgPath: 'M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z', viewBox: '0 0 256 256', useCase: 'Corner decorations, swirl patterns' },
            { id: 'pattern-5', name: 'Quarter Circles', svgPath: 'M 64 128 C 64 163.346 92.654 192 128 192 L 128 256 C 57.308 256 0 198.692 0 128 Z M 192 128 C 192 163.346 220.654 192 256 192 L 256 256 C 185.308 256 128 198.692 128 128 Z M 64 0 C 64 35.346 92.654 64 128 64 L 128 128 C 57.308 128 0 70.692 0 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z', viewBox: '0 0 256 256', useCase: 'Geometric tiles, modern patterns' },
            { id: 'pattern-7', name: 'Cross Star', svgPath: 'M 112 32 L 54.627 32 L 128 105.373 L 201.373 32 L 144 32 L 144 0 L 256 0 L 256 112 L 224 112 L 224 54.627 L 150.627 128 L 224 201.373 L 224 144 L 256 144 L 256 256 L 144 256 L 144 224 L 201.373 224 L 128 150.627 L 54.627 224 L 112 224 L 112 256 L 0 256 L 0 144 L 32 144 L 32 201.373 L 105.373 128 L 32 54.627 L 32 112 L 0 112 L 0 0 L 112 0 Z', viewBox: '0 0 256 256', useCase: 'Bold patterns, star motifs' },
            { id: 'pattern-10', name: 'Puzzle Piece', svgPath: 'M 64 192 L 128 192 L 128 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 128 L 64 128 Z M 192 192 L 256 192 L 256 256 L 192 256 C 156.654 256 128 227.346 128 192 L 128 128 L 192 128 Z M 64 64 L 128 64 L 128 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 128 L 192 128 L 192 64 L 128 64 L 128 128 L 64 128 C 28.654 128 0 99.346 0 64 L 0 0 L 64 0 Z', viewBox: '0 0 256 256', useCase: 'Interactive designs, puzzle themes' },
            { id: 'pattern-13', name: 'Corner Circle', svgPath: 'M 92 72 C 142.81 72 184 113.19 184 164 C 184 214.81 142.81 256 92 256 C 41.19 256 0 214.81 0 164 C 0 113.19 41.19 72 92 72 Z M 256 0 L 256 256 L 184 256 L 184 72 L 0 72 L 0 0 Z', viewBox: '0 0 256 256', useCase: 'Corner accents, modern layouts' },
            { id: 'pattern-15', name: 'Hourglass', svgPath: 'M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z', viewBox: '0 0 256 256', useCase: 'Time-related designs, abstract patterns' },
            { id: 'pattern-17', name: 'Diagonal Split', svgPath: 'M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z', viewBox: '0 0 256 256', useCase: 'Diagonal divisions, dynamic compositions' },
            { id: 'pattern-18', name: 'Wave Grid', svgPath: 'M 64 192 C 64 227.346 35.346 256 0 256 L 0 192 C 0 156.654 28.654 128 64 128 Z M 128 128 C 163.346 128 192 156.654 192 192 L 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 L 64 192 C 64 156.654 92.654 128 128 128 Z M 192 128 C 227.346 128 256 156.654 256 192 L 256 256 C 220.654 256 192 227.346 192 192 Z M 0 0 C 35.346 0 64 28.654 64 64 L 64 128 C 28.654 128 0 99.346 0 64 Z M 192 64 C 192 99.346 163.346 128 128 128 C 92.654 128 64 99.346 64 64 L 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 256 64 C 256 99.346 227.346 128 192 128 L 192 64 C 192 28.654 220.654 0 256 0 Z', viewBox: '0 0 256 256', useCase: 'Flowing grids, organic patterns' },
            { id: 'pattern-19', name: 'Figure Eight', svgPath: 'M 64 0 C 99.346 0 128 28.654 128 64 L 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 C 227.346 0 256 28.654 256 64 L 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z', viewBox: '0 0 256 256', useCase: 'Infinity themes, continuous patterns' },
            { id: 'pattern-20', name: 'Corner Curves', svgPath: 'M 128 28 C 128 83.228 83.228 128 28 128 L 128 128 Z M 256 156 C 256 211.228 211.228 256 156 256 L 128 256 L 128 156 C 128 211.228 83.228 256 28 256 L 0 256 L 0 0 L 256 0 L 256 28 C 256 83.228 211.228 128 156 128 L 256 128 Z', viewBox: '0 0 256 256', useCase: 'Soft corners, elegant frames' },
            { id: 'pattern-21', name: 'Flower Shape', svgPath: 'M 78 0 C 105.614 0 128 22.386 128 50 C 128 22.386 150.386 0 178 0 L 256 0 L 256 78 C 256 105.614 233.614 128 206 128 C 233.614 128 256 150.386 256 178 L 256 256 L 178 256 C 150.386 256 128 233.614 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 178 C 0 150.386 22.386 128 50 128 C 22.386 128 0 105.614 0 78 L 0 0 Z', viewBox: '0 0 256 256', useCase: 'Floral designs, nature themes' },
            { id: 'pattern-22', name: 'Donut', svgPath: 'M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 64 C 92.654 64 64 92.654 64 128 C 64 163.346 92.654 192 128 192 C 163.346 192 192 163.346 192 128 C 192 92.654 163.346 64 128 64 Z', viewBox: '0 0 256 256', useCase: 'Ring patterns, circular frames' },
            { id: 'pattern-25', name: 'Arch Wave', svgPath: 'M 128 128 C 198.692 128 256 185.308 256 256 L 200 256 C 200 216.235 167.765 184 128 184 C 88.236 184 56 216.235 56 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z', viewBox: '0 0 256 256', useCase: 'Arch patterns, architectural themes' },
            { id: 'pattern-30', name: 'Chain Links', svgPath: 'M 191.173 128.005 C 156.208 128.448 128 156.93 128 192 C 128 227.346 156.654 256 192 256 L 256 256 L 256 216 L 192 216 C 178.745 216 168 205.255 168 192 C 168 178.745 178.745 168 192 168 L 256 168 L 256 88 L 192 88 C 178.745 88 168 77.255 168 64 C 168 50.745 178.745 40 192 40 L 256 40 L 256 0 L 192 0 C 156.654 0 128 28.654 128 64 C 128 99.346 156.654 128 192 128 Z M 0 40 L 64 40 C 77.255 40 88 50.745 88 64 C 88 77.255 77.255 88 64 88 L 0 88 L 0 168 L 64 168 C 77.255 168 88 178.745 88 192 C 88 205.255 77.255 216 64 216 L 0 216 L 0 256 L 64 256 C 99.346 256 128 227.346 128 192 C 128 156.93 99.792 128.448 64.827 128.005 L 64 128 C 99.346 128 128 99.346 128 64 C 128 28.654 99.346 0 64 0 L 0 0 Z', viewBox: '0 0 256 256', useCase: 'Chain patterns, connection themes' },
            { id: 'pattern-35', name: 'Dice Pattern', svgPath: 'M 60 136 C 93.137 136 120 162.863 120 196 C 120 229.137 93.137 256 60 256 C 26.863 256 0 229.137 0 196 C 0 162.863 26.863 136 60 136 Z M 196 136 C 229.137 136 256 162.863 256 196 C 256 229.137 229.137 256 196 256 C 162.863 256 136 229.137 136 196 C 136 162.863 162.863 136 196 136 Z M 128 104 C 141.255 104 152 114.745 152 128 C 152 141.255 141.255 152 128 152 C 114.745 152 104 141.255 104 128 C 104 114.745 114.745 104 128 104 Z M 60 0 C 93.137 0 120 26.863 120 60 C 120 93.137 93.137 120 60 120 C 26.863 120 0 93.137 0 60 C 0 26.863 26.863 0 60 0 Z M 196 0 C 229.137 0 256 26.863 256 60 C 256 93.137 229.137 120 196 120 C 162.863 120 136 93.137 136 60 C 136 26.863 162.863 0 196 0 Z', viewBox: '0 0 256 256', useCase: 'Gaming themes, dot patterns' },
            { id: 'pattern-40', name: 'Bow Tie', svgPath: 'M 28 128 C 83.228 128 128 172.772 128 228 C 128 172.772 172.772 128 228 128 Z M 256 256 L 0 256 L 0 0 L 28 0 C 83.228 0 128 44.772 128 100 C 128 44.772 172.772 0 228 0 L 256 0 Z', viewBox: '0 0 256 256', useCase: 'Fashion themes, elegant patterns' },
            { id: 'pattern-45', name: 'Checkerboard', svgPath: 'M 128 256 L 64 256 L 64 192 L 128 192 Z M 256 256 L 192 256 L 192 192 L 256 192 Z M 64 192 L 0 192 L 0 128 L 64 128 Z M 192 192 L 128 192 L 128 128 L 192 128 Z M 128 128 L 64 128 L 64 64 L 128 64 Z M 256 128 L 192 128 L 192 64 L 256 64 Z M 64 64 L 0 64 L 0 0 L 64 0 Z M 192 64 L 128 64 L 128 0 L 192 0 Z', viewBox: '0 0 256 256', useCase: 'Classic checker patterns, racing themes' },
            { id: 'pattern-50', name: 'Target Ring', svgPath: 'M 65.025 143.01 C 70.813 165.5 88.518 183.205 111.008 188.993 L 111.008 254.018 C 53.108 246.798 7.22 200.909 0 143.01 Z M 254.016 143.01 C 246.796 200.909 200.907 246.798 143.008 254.018 L 143.008 188.993 C 165.498 183.205 183.203 165.5 188.991 143.01 Z M 127.008 111.01 C 135.845 111.01 143.008 118.173 143.008 127.01 C 143.008 135.847 135.845 143.01 127.008 143.01 C 118.171 143.01 111.008 135.847 111.008 127.01 C 111.008 118.173 118.171 111.01 127.008 111.01 Z M 111.008 65.026 C 88.518 70.814 70.813 88.52 65.025 111.01 L 0 111.01 C 7.22 53.11 53.109 7.221 111.008 0.001 Z M 143.008 0 C 200.907 7.221 246.796 53.111 254.016 111.01 L 188.991 111.01 C 183.203 88.52 165.498 70.814 143.008 65.026 Z', viewBox: '0 0 256 256', useCase: 'Target/bullseye designs, focus elements' },
            { id: 'pattern-55', name: 'Scallop Edge', svgPath: 'M 256 14 C 256 41.614 233.614 64 206 64 L 256 64 L 256 142 C 256 169.614 233.614 192 206 192 L 256 192 L 256 256 L 0 256 L 0 242 C 0 214.386 22.386 192 50 192 L 0 192 L 0 114 C 0 86.386 22.386 64 50 64 L 0 64 L 0 0 L 256 0 Z M 128 242 C 128 214.386 150.386 192 178 192 L 128 192 Z M 128 142 C 128 169.614 105.614 192 78 192 L 128 192 Z M 128 114 C 128 86.386 150.386 64 178 64 L 128 64 Z M 128 14 C 128 41.614 105.614 64 78 64 L 128 64 Z', viewBox: '0 0 256 256', useCase: 'Scalloped borders, decorative edges' },
            { id: 'pattern-60', name: 'Arrow Tiles', svgPath: 'M 0 256 L 0 128 L 128 128 Z M 128 256 L 128 128 L 256 128 Z M 0 128 L 0 0 L 128 0 Z M 128 128 L 128 0 L 256 0 Z', viewBox: '0 0 256 256', useCase: 'Directional patterns, chevron tiles' },
            { id: 'pattern-65', name: 'Corner Notch', svgPath: 'M 128 128 L 128 78 C 128 105.614 105.614 128 78 128 L 128 128 L 128 178 C 128 150.386 150.386 128 178 128 Z M 256 256 L 128 256 L 128 206 C 128 233.614 105.614 256 78 256 L 0 256 L 0 0 L 128 0 L 128 50 C 128 22.386 150.386 0 178 0 L 256 0 Z', viewBox: '0 0 256 256', useCase: 'Notched corners, modern frames' },
            { id: 'pattern-70', name: 'Rounded Corner', svgPath: 'M 256 192 C 256 227.346 227.346 256 192 256 L 0 256 L 0 64 C 0 28.654 28.654 0 64 0 L 256 0 Z M 128 192 L 192 192 L 192 128 L 128 128 L 128 64 L 64 64 L 64 128 L 128 128 Z', viewBox: '0 0 256 256', useCase: 'Rounded layouts, soft geometric designs' },
        ],
        tips: [
            'Use type: "polygon" with svgPath and svgViewBox to add these shapes',
            'All extra shapes use viewBox "0 0 256 256" - scale by adjusting width/height',
            'Combine multiple shapes for complex compositions',
            'Apply fill gradients for stunning visual effects',
            'Use as masks, backgrounds, or standalone decorative elements',
            'Repeat shapes in a grid for seamless tile patterns',
        ],
    },
};

/**
 * Get shapes by category or all shapes
 */
export function getShapes(category?: string): Record<string, ShapeCategory> | ShapeCategory {
    if (!category || category === 'all') {
        return SVG_SHAPES;
    }
    
    if (SVG_SHAPES[category]) {
        return SVG_SHAPES[category];
    }
    
    throw new Error(`Unknown shape category: ${category}. Available: ${Object.keys(SVG_SHAPES).join(', ')}, all`);
}

/**
 * Get a specific shape by ID
 */
export function getShapeById(id: string): Shape | undefined {
    for (const category of Object.values(SVG_SHAPES)) {
        const shape = category.shapes.find(s => s.id === id);
        if (shape) return shape;
    }
    return undefined;
}

/**
 * List all shape categories
 */
export function listCategories(): string[] {
    return Object.keys(SVG_SHAPES);
}
