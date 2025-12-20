# Release Notes - v1.1.0

## 🎉 Major Feature Release

We're excited to announce version 1.1.0 of the Canvelete MCP Server, featuring comprehensive enhancements that transform it into a complete design system with full element awareness, asset discovery, and dynamic template capabilities.

## 🆕 What's New

### New Element Types

#### QR Code Generator
Generate QR codes directly in your designs with full customization:
- **Supported Data**: URLs, vCards, WiFi credentials, email, phone, SMS, plain text
- **Customization**: Custom colors, error correction levels, margins
- **Dynamic Support**: Use template variables like `{{ticket_url}}`

```json
{
  "type": "qrcode",
  "qrData": "https://canvelete.com",
  "qrColor": "#1e293b",
  "qrBgColor": "#ffffff",
  "qrErrorLevel": "M"
}
```

#### Barcode Generator
Support for 10 barcode formats for product labels, inventory, and tracking:
- **Formats**: CODE128, CODE39, EAN13, EAN8, UPC, UPCE, ITF14, MSI, pharmacode, codabar
- **Customization**: Colors, text display, bar dimensions
- **Dynamic Support**: Use template variables like `{{product_sku}}`

```json
{
  "type": "barcode",
  "barcodeData": "123456789012",
  "barcodeFormat": "CODE128",
  "barcodeShowText": true
}
```

### Comprehensive Documentation

#### Element Types Guide
Complete documentation for all 13 element types:
- Detailed capabilities and limitations
- Required properties and examples
- Styling capabilities matrix
- Dynamic element support
- Best practices and design patterns

#### Asset Search Guide
Complete guide to searching and using external assets:
- **200K+ Icons** from Iconify (150+ icon sets)
- **2.7M+ Images** from Pixabay
- **3M+ Photos** from Unsplash
- **10K+ Cliparts** from Canvelete library
- **5K+ Illustrations** for creative designs

Includes search tips, example queries, and complete workflows.

### Enhanced Metadata Resource

The metadata resource now includes:
- Complete element capabilities documentation
- Styling capabilities matrix
- Dynamic element support reference
- Common design patterns (certificates, badges, social posts)
- Enhanced asset source documentation
- Font catalog with 30+ professional fonts

### Element Capabilities

Every element type now has comprehensive documentation:
- What it can do and what it can't
- Styling limits and capabilities
- Required vs optional properties
- Best use cases and examples
- Dynamic content support

**Styling Capabilities Matrix:**
| Property | Supported Elements |
|----------|-------------------|
| `fill` | rectangle, circle, polygon, star, bezier, container, table |
| `stroke` | rectangle, circle, line, polygon, star, bezier, container, table |
| `borderRadius` | rectangle, image, container |
| `rotation` | **All elements** |
| `opacity` | **All elements** |
| `filters` | rectangle, circle, text, image, polygon, star, container |
| `gradients` | rectangle, circle, polygon, star, bezier, container |

## 📚 New Documentation Files

1. **ELEMENT_TYPES_GUIDE.md** - Complete guide to all element types
2. **ASSET_SEARCH_GUIDE.md** - Asset search documentation and workflows
3. **ENHANCEMENTS_SUMMARY.md** - Detailed summary of all enhancements

## 🔧 Technical Improvements

- Enhanced type definitions with detailed descriptions
- Comprehensive Zod schemas for validation
- Better error messages and validation
- Improved package description
- Updated README with documentation links

## 📦 Package Updates

- Version bumped to 1.1.0
- New documentation files included in package
- Enhanced package description highlighting new capabilities
- Updated keywords for better discoverability

## 🚀 Getting Started

### Installation

```bash
npm install -g @canveletedotcom/mcp-server@1.1.0
```

### Configuration

```json
{
  "mcpServers": {
    "canvelete-mcp-server": {
      "command": "canvelete-mcp",
      "args": ["start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Quick Examples

**Create Certificate with QR Code:**
```javascript
// Add QR code for verification
await add_element({
  designId: "cert_id",
  element: {
    type: "qrcode",
    x: 1900,
    y: 1400,
    width: 200,
    height: 200,
    qrData: "{{certificate_url}}",
    isDynamic: true,
    qrErrorLevel: "H"
  }
});
```

**Add Product Barcode:**
```javascript
await add_element({
  designId: "label_id",
  element: {
    type: "barcode",
    x: 100,
    y: 300,
    width: 300,
    height: 100,
    barcodeData: "{{product_sku}}",
    barcodeFormat: "CODE128",
    isDynamic: true
  }
});
```

**Search and Add Icons:**
```javascript
// Search for icons
const icons = await search_icons({ query: "home" });

// Add icon to design
await add_element({
  designId: "design_id",
  element: {
    type: "svg",
    x: 50,
    y: 50,
    width: 64,
    height: 64,
    src: "https://api.iconify.design/mdi/home.svg",
    objectFit: "contain"
  }
});
```

## 🔄 Migration Guide

This release is **fully backward compatible**. No changes required to existing code.

New features are additive:
- New element types: `qrcode`, `barcode`
- Enhanced documentation and metadata
- Additional asset search capabilities

## 📖 Documentation

- [Element Types Guide](./ELEMENT_TYPES_GUIDE.md)
- [Asset Search Guide](./ASSET_SEARCH_GUIDE.md)
- [Enhancements Summary](./ENHANCEMENTS_SUMMARY.md)
- [README](./README.md)
- [Changelog](./CHANGELOG.md)

## 🙏 Acknowledgments

This release addresses critical feedback about element awareness, asset discovery, and dynamic template support. Thank you to all users who provided feedback!

## 🐛 Bug Fixes

- Fixed missing logger import in ws-notify.ts
- Improved type definitions for all element types

## 🔮 What's Next

We're continuously improving the MCP server. Future releases will include:
- More element types and capabilities
- Enhanced AI design generation
- Additional asset sources
- Performance optimizations

## 📞 Support

- **Documentation**: https://docs.canvelete.com
- **Issues**: https://github.com/canvelete/canvelete/issues
- **Platform**: https://canvelete.com

---

**Full Changelog**: [CHANGELOG.md](./CHANGELOG.md)
