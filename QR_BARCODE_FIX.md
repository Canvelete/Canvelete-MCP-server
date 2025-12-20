# QR Code and Barcode Element Type Fix

## Issue
The MCP server was using incorrect element types and property names for QR codes and barcodes, causing them to fail when created from the toolbar or via MCP tools.

## Root Cause
**Mismatch between MCP server and frontend:**

### QR Codes
- ❌ MCP used: `type: "qrcode"` and `qrData`
- ✅ Frontend expects: `type: "qr"` and `qrValue`

### Barcodes
- ❌ MCP used: `barcodeData`, `barcodeTextSize`
- ✅ Frontend expects: `barcodeValue`, `barcodeFontSize`, `barcodeTextMargin`, `barcodeTextAlign`

## Changes Made

### 1. Type Definitions (`mcp-server/src/types/index.ts`)
- Changed `ElementTypeEnum` from `'qrcode'` to `'qr'`
- Renamed `qrData` → `qrValue`
- Renamed `barcodeData` → `barcodeValue`
- Renamed `barcodeTextSize` → `barcodeFontSize`
- Added `barcodeTextMargin` property
- Added `barcodeTextAlign` property
- Updated default values to match frontend

### 2. Tool Schemas (`mcp-server/src/index.ts`)
- Updated `add_element` tool schema:
  - Changed enum from `'qrcode'` to `'qr'`
  - Updated all property names to match frontend
  - Updated descriptions and defaults

### 3. Element Capabilities (`mcp-server/src/resources/element-capabilities.ts`)
- Renamed `qrcode` section to `qr`
- Updated all property references
- Updated examples to use correct property names
- Updated styling matrix references

### 4. Documentation (`mcp-server/README.md`)
- Updated element type list to show `qr` instead of `qrcode`

## Correct Usage

### QR Code Element
```typescript
{
  type: "qr",
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  qrValue: "https://canvelete.com",  // ✅ qrValue (not qrData)
  qrColor: "#000000",
  qrBgColor: "#ffffff",
  qrErrorLevel: "M",
  qrMargin: 1
}
```

### Barcode Element
```typescript
{
  type: "barcode",
  x: 100,
  y: 100,
  width: 300,
  height: 100,
  barcodeValue: "123456789012",      // ✅ barcodeValue (not barcodeData)
  barcodeFormat: "CODE128",
  barcodeLineColor: "#000000",
  barcodeBackground: "transparent",
  barcodeShowText: true,
  barcodeFontSize: 20,                // ✅ barcodeFontSize (not barcodeTextSize)
  barcodeTextMargin: 2,               // ✅ New property
  barcodeTextAlign: "center"          // ✅ New property
}
```

## Testing
1. Build completed successfully ✅
2. Type checking passed ✅
3. All property names now match frontend expectations ✅

## Impact
- **Breaking Change**: Existing MCP clients using `type: "qrcode"` or old property names will need to update
- **Fix**: QR codes and barcodes created via MCP tools will now render correctly in the frontend
- **Fix**: Update element operations will work properly for QR codes and barcodes

## Migration Guide
If you have existing code using the old property names:

```typescript
// OLD (broken)
{
  type: "qrcode",
  qrData: "https://example.com"
}

// NEW (working)
{
  type: "qr",
  qrValue: "https://example.com"
}

// OLD (broken)
{
  type: "barcode",
  barcodeData: "12345",
  barcodeTextSize: 12
}

// NEW (working)
{
  type: "barcode",
  barcodeValue: "12345",
  barcodeFontSize: 20
}
```

## Files Modified
- `mcp-server/src/types/index.ts`
- `mcp-server/src/index.ts`
- `mcp-server/src/resources/element-capabilities.ts`
- `mcp-server/README.md`

## Version
Fixed in: MCP Server v1.1.0+
Date: December 19, 2024
