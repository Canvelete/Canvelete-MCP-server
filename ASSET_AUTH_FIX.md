# Asset Search Authentication Fix

## Issue
Asset search tools (Pixabay, Unsplash, Iconify, Clipart, Illustrations) were failing with 401 Unauthorized errors in production MCP server.

**Error Response:**
```json
{
  "assets": [],
  "source": "pixabay",
  "error": "Failed to fetch assets",
  "message": "Asset API returned 401",
  "pagination": {
    "page": 1,
    "perPage": 5,
    "total": 0,
    "totalPages": 0
  }
}
```

## Root Cause
The MCP server's asset search functions were calling the `/api/assets/library` endpoint without authentication headers. The API endpoint requires authentication (either session or API key), but the MCP server was not passing the API key in the Authorization header.

**API Endpoint Requirements:**
```typescript
// From app/api/assets/library/route.ts
const userId = await getAuthenticatedUserId(req);

if (!userId) {
  return NextResponse.json(
    { error: 'Unauthorized', message: 'Authentication required. Provide a valid session or API key.' },
    { status: 401 }
  );
}
```

## Changes Made

### 1. Updated AuthContext Interface (`mcp-server/src/auth.ts`)

Added `apiKey` property to `AuthContext` so it can be passed to asset search functions:

**Before:**
```typescript
export interface AuthContext {
    apiClient: CanveleteClient;
}
```

**After:**
```typescript
export interface AuthContext {
    apiClient: CanveleteClient;
    apiKey: string;
}
```

### 2. Updated Asset Tool Functions (`mcp-server/src/tools/asset-tools.ts`)

Added `auth: AuthContext` parameter to all asset search functions and included Authorization header:

**Before:**
```typescript
export async function searchStockImages(options: any) {
    // ...
    const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
        headers: {
            'Accept': 'application/json',
        },
    });
}
```

**After:**
```typescript
export async function searchStockImages(auth: AuthContext, options: any) {
    // ...
    const response = await fetch(`${baseUrl}/api/assets/library?${params}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth.apiKey}`,
        },
    });
}
```

**Functions Updated:**
- `searchStockImages(auth, options)` - Main search function for all sources
- `searchIcons(auth, query, page, perPage)` - Iconify icon search
- `searchClipart(auth, query, tag, page, perPage)` - Clipart search
- `searchIllustrations(auth, query, category, page, perPage)` - Illustrations search

### 3. Updated Tool Handlers (`mcp-server/src/index.ts`)

Updated all asset search tool handlers to authenticate and pass auth context:

**Before:**
```typescript
case 'search_stock_images': {
    const result = await searchStockImages(args);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
```

**After:**
```typescript
case 'search_stock_images': {
    const auth = await getAuth(args);
    const result = await searchStockImages(auth, args);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
```

**Tool Handlers Updated:**
- `search_stock_images`
- `search_icons`
- `search_clipart`
- `search_illustrations`

## Authentication Flow

1. **MCP Client** calls tool with `apiKey` parameter (or uses CLI override/env var)
2. **MCP Server** authenticates via `getAuth(args)` helper
3. **Auth Context** is passed to asset search function
4. **Asset Function** includes `Authorization: Bearer ${apiKey}` header
5. **API Endpoint** validates API key and returns results

### 4. Schema Updates

Added `apiKey` parameter to all asset search tool schemas in `mcp-server/src/index.ts`:

**Tools Updated:**
- `search_stock_images` - Added `apiKey: { type: 'string', description: 'Canvelete API key' }`
- `search_icons` - Added `apiKey: { type: 'string', description: 'Canvelete API key' }`
- `search_clipart` - Added `apiKey: { type: 'string', description: 'Canvelete API key' }`
- `search_illustrations` - Added `apiKey: { type: 'string', description: 'Canvelete API key' }`

This ensures MCP clients know they can pass the API key as a tool parameter.

## Testing

Build completed successfully:
```bash
npm run build
# ✅ Build success in 238ms
```

All TypeScript diagnostics cleared ✅

## Impact

- **Fixed**: All asset search tools now work correctly with authentication
- **Required**: API key must be provided via:
  - Tool argument: `{ apiKey: "your-key", query: "search" }`
  - CLI option: `--api-key your-key`
  - Environment variable: `CANVELETE_API_KEY=your-key`

## Usage Example

```typescript
// MCP Tool Call
{
  "tool": "search_stock_images",
  "arguments": {
    "apiKey": "cvl_xxxxxxxxxxxxx",
    "query": "nature",
    "page": 1,
    "perPage": 20
  }
}

// Now returns successful response:
{
  "assets": [
    {
      "id": "12345",
      "url": "https://...",
      "thumbnail": "https://...",
      "width": 1920,
      "height": 1080,
      "description": "Beautiful nature scene",
      "source": "pixabay"
    }
  ],
  "source": "pixabay",
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

## Files Modified
- `mcp-server/src/auth.ts` - Added `apiKey` property to `AuthContext` interface
- `mcp-server/src/tools/asset-tools.ts` - Added auth parameter and Authorization headers
- `mcp-server/src/index.ts` - Updated tool handlers to authenticate and pass auth context, added apiKey to tool schemas

## Version
Fixed in: MCP Server v1.1.0+
Date: December 19, 2024
