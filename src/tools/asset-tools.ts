// Asset management tools for MCP server
import type { AuthContext } from '../auth.js';
import { validateInput } from '../utils/validation.js';
import { ListAssetsSchema, SearchStockImagesSchema } from '../types/index.js';
import { logger } from '../utils/logger.js';

/**
 * List user's assets
 */
export async function listAssets(auth: AuthContext, options: any = {}) {
    const data = validateInput(ListAssetsSchema, options);

    const type = data.type;
    const page = data.page ?? 1;

    return auth.apiClient.listAssets(type, page);
}

/**
 * Search stock images from various sources (Pixabay, Unsplash, Iconify, Clipart, Illustrations)
 */
export async function searchStockImages(options: any) {
    const data = validateInput(SearchStockImagesSchema, options);
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';

    // Determine source from query or default to pixabay
    let source = 'pixabay';
    let cleanQuery = data.query;

    // Allow specifying source in query like "icon:home" or "clipart:business"
    if (data.query.includes(':')) {
        const [prefix, ...rest] = data.query.split(':');
        const prefixLower = prefix.toLowerCase();
        if (['icon', 'icons', 'iconify'].includes(prefixLower)) {
            source = 'iconify';
            cleanQuery = rest.join(':');
        } else if (['clipart', 'clip'].includes(prefixLower)) {
            source = 'clipart';
            cleanQuery = rest.join(':');
        } else if (['illustration', 'illustrations'].includes(prefixLower)) {
            source = 'illustrations';
            cleanQuery = rest.join(':');
        } else if (['photo', 'unsplash'].includes(prefixLower)) {
            source = 'unsplash';
            cleanQuery = rest.join(':');
        }
    }

    try {
        const params = new URLSearchParams({
            source,
            query: cleanQuery,
            page: (data.page ?? 1).toString(),
            per_page: (data.perPage ?? 20).toString(),
        });

        const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Asset API returned ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        logger.error('Failed to fetch stock images', error);
        // Return fallback response
        return {
            assets: [],
            source,
            error: 'Failed to fetch assets',
            message: error instanceof Error ? error.message : 'Unknown error',
            pagination: {
                page: data.page ?? 1,
                perPage: data.perPage ?? 20,
                total: 0,
                totalPages: 0,
            },
        };
    }
}

/**
 * Search icons specifically from Iconify (200K+ icons)
 */
export async function searchIcons(query: string, page = 1, perPage = 20) {
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';

    try {
        const params = new URLSearchParams({
            source: 'iconify',
            query,
            page: page.toString(),
            per_page: perPage.toString(),
        });

        const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Icon API returned ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        logger.error('Failed to fetch icons', error);
        return {
            assets: [],
            source: 'iconify',
            error: 'Failed to fetch icons',
            message: error instanceof Error ? error.message : 'Unknown error',
            pagination: { page, perPage, total: 0, totalPages: 0 },
        };
    }
}

/**
 * Search clipart from assets.canvelete.com
 */
export async function searchClipart(query: string, tag?: string, page = 1, perPage = 20) {
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';

    try {
        const params = new URLSearchParams({
            source: 'clipart',
            query,
            page: page.toString(),
            per_page: perPage.toString(),
        });

        if (tag && tag !== 'all') {
            params.append('tag', tag);
        }

        const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Clipart API returned ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        logger.error('Failed to fetch clipart', error);
        return {
            assets: [],
            source: 'clipart',
            error: 'Failed to fetch clipart',
            message: error instanceof Error ? error.message : 'Unknown error',
            pagination: { page, perPage, total: 0, totalPages: 0 },
        };
    }
}

/**
 * Search illustrations
 */
export async function searchIllustrations(query: string, category?: string, page = 1, perPage = 20) {
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';

    try {
        const params = new URLSearchParams({
            source: 'illustrations',
            query,
            page: page.toString(),
            per_page: perPage.toString(),
        });

        if (category && category !== 'all') {
            params.append('category', category);
        }

        const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Illustrations API returned ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        logger.error('Failed to fetch illustrations', error);
        return {
            assets: [],
            source: 'illustrations',
            error: 'Failed to fetch illustrations',
            message: error instanceof Error ? error.message : 'Unknown error',
            pagination: { page, perPage, total: 0, totalPages: 0 },
        };
    }
}

/**
 * Upload an asset
 * Note: This returns instructions - actual upload should be done via the main API
 */
export async function uploadAsset(auth: AuthContext, filename: string, type: string) {
    const baseUrl = process.env.CANVELETE_API_URL || 'https://canvelete.com';
    const uploadUrl = `${baseUrl}/api/assets/upload-signature`;

    return {
        message:
            'Asset uploads should be done through the main Canvelete API using Cloudinary signed uploads.',
        uploadUrl,
        steps: [
            '1. Request upload signature from the upload URL',
            '2. Upload file to Cloudinary using the signature',
            '3. Complete upload by calling /api/assets/upload-complete',
        ],
    };
}

/**
 * Complete font catalog with metadata for design decisions
 */
const FONT_CATALOG = {
    sansSerif: [
        { family: 'Inter', weights: ['400', '500', '600', '700'], style: 'Modern, readable, versatile', bestFor: ['ui', 'body', 'interface'] },
        { family: 'Roboto', weights: ['300', '400', '500', '700'], style: 'Neutral, versatile, friendly', bestFor: ['ui', 'body', 'mobile'] },
        { family: 'Montserrat', weights: ['400', '500', '600', '700', '800'], style: 'Geometric, modern, bold', bestFor: ['headlines', 'display', 'branding'] },
        { family: 'Poppins', weights: ['400', '500', '600', '700'], style: 'Geometric, friendly, approachable', bestFor: ['headlines', 'ui', 'marketing'] },
        { family: 'Open Sans', weights: ['400', '600', '700'], style: 'Humanist, friendly, readable', bestFor: ['body', 'ui', 'content'] },
        { family: 'Lato', weights: ['400', '700', '900'], style: 'Humanist, warm, professional', bestFor: ['body', 'corporate', 'web'] },
        { family: 'Raleway', weights: ['400', '500', '600', '700'], style: 'Elegant, thin, sophisticated', bestFor: ['headlines', 'luxury', 'fashion'] },
        { family: 'Nunito', weights: ['400', '600', '700'], style: 'Rounded, friendly, playful', bestFor: ['ui', 'children', 'casual'] },
        { family: 'Ubuntu', weights: ['400', '500', '700'], style: 'Humanist, modern, technical', bestFor: ['ui', 'tech', 'body'] },
    ],
    serif: [
        { family: 'Playfair Display', weights: ['400', '500', '600', '700'], style: 'High contrast, elegant, dramatic', bestFor: ['headlines', 'luxury', 'editorial'] },
        { family: 'Merriweather', weights: ['400', '700'], style: 'Screen-optimized, readable, traditional', bestFor: ['body', 'editorial', 'long-form'] },
        { family: 'Lora', weights: ['400', '500', '600', '700'], style: 'Contemporary, calligraphic, elegant', bestFor: ['body', 'editorial', 'blog'] },
        { family: 'PT Serif', weights: ['400', '700'], style: 'Transitional, versatile, professional', bestFor: ['body', 'corporate', 'print'] },
        { family: 'Crimson Text', weights: ['400', '600', '700'], style: 'Old-style, classic, bookish', bestFor: ['body', 'literature', 'academic'] },
    ],
    display: [
        { family: 'Bebas Neue', weights: ['400'], style: 'Condensed, impactful, bold', bestFor: ['headlines', 'posters', 'sports'] },
        { family: 'Anton', weights: ['400'], style: 'Bold, attention-grabbing, strong', bestFor: ['headlines', 'banners', 'advertising'] },
        { family: 'Righteous', weights: ['400'], style: 'Retro, funky, distinctive', bestFor: ['headlines', 'branding', 'creative'] },
        { family: 'Oswald', weights: ['400', '500', '600', '700'], style: 'Condensed, modern, versatile', bestFor: ['headlines', 'web', 'editorial'] },
    ],
    script: [
        { family: 'Pacifico', weights: ['400'], style: 'Casual, brush, playful', bestFor: ['accents', 'logos', 'casual'] },
        { family: 'Dancing Script', weights: ['400', '500', '600', '700'], style: 'Elegant, flowing, romantic', bestFor: ['accents', 'invitations', 'feminine'] },
        { family: 'Great Vibes', weights: ['400'], style: 'Formal, calligraphic, elegant', bestFor: ['accents', 'weddings', 'luxury'] },
    ],
    monospace: [
        { family: 'JetBrains Mono', weights: ['400', '500', '700'], style: 'Code-optimized, modern, technical', bestFor: ['code', 'technical', 'data'] },
        { family: 'Roboto Mono', weights: ['400', '500', '700'], style: 'Geometric, clean, technical', bestFor: ['code', 'technical', 'ui'] },
        { family: 'Source Code Pro', weights: ['400', '600', '700'], style: 'Code-optimized, readable, professional', bestFor: ['code', 'technical', 'documentation'] },
    ],
};

/**
 * List available fonts with complete metadata
 */
export async function listFonts(category?: string) {
    // Flatten the font catalog for easy listing
    const allFonts = [
        ...FONT_CATALOG.sansSerif.map(f => ({ ...f, category: 'sans-serif' })),
        ...FONT_CATALOG.serif.map(f => ({ ...f, category: 'serif' })),
        ...FONT_CATALOG.display.map(f => ({ ...f, category: 'display' })),
        ...FONT_CATALOG.script.map(f => ({ ...f, category: 'script' })),
        ...FONT_CATALOG.monospace.map(f => ({ ...f, category: 'monospace' })),
    ];

    // Filter by category if specified
    const filteredFonts = category && category !== 'all'
        ? allFonts.filter(f => f.category === category)
        : allFonts;

    const recommendations = {
        headlines: ['Montserrat', 'Bebas Neue', 'Oswald', 'Playfair Display', 'Anton'],
        body: ['Inter', 'Open Sans', 'Roboto', 'Lato', 'Merriweather'],
        elegant: ['Playfair Display', 'Lora', 'Raleway', 'Dancing Script', 'Great Vibes'],
        modern: ['Inter', 'Poppins', 'Montserrat', 'Roboto'],
        playful: ['Nunito', 'Pacifico', 'Righteous'],
        technical: ['JetBrains Mono', 'Roboto Mono', 'Source Code Pro'],
    };

    const fontPairings = [
        { headline: 'Montserrat', body: 'Open Sans', style: 'Modern professional' },
        { headline: 'Playfair Display', body: 'Lato', style: 'Elegant editorial' },
        { headline: 'Bebas Neue', body: 'Roboto', style: 'Bold & clean' },
        { headline: 'Oswald', body: 'Merriweather', style: 'Editorial contrast' },
        { headline: 'Poppins', body: 'Inter', style: 'Friendly modern' },
        { headline: 'Raleway', body: 'Lora', style: 'Sophisticated' },
        { headline: 'Anton', body: 'Open Sans', style: 'High impact' },
        { headline: 'Dancing Script', body: 'Lato', style: 'Romantic elegant' },
    ];

    return {
        fonts: filteredFonts,
        byCategory: FONT_CATALOG,
        recommendations,
        fontPairings,
        totalFonts: allFonts.length,
        categories: ['sans-serif', 'serif', 'display', 'script', 'monospace'],
        usage: {
            description: 'Use fontFamily property on text elements',
            example: {
                type: 'text',
                text: 'Hello World',
                fontFamily: 'Montserrat',
                fontWeight: '700',
                fontSize: 48,
            },
        },
    };
}
