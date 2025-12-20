# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**🔗 Related Resources:**
- **[Canvelete Platform](https://canvelete.com)** - Main application
- **[Documentation](https://docs.canvelete.com)** - Platform and API documentation

## [1.1.1] - 2024-12-19

### Fixed - Critical Bug Fixes 🐛

#### QR Code and Barcode Element Types
- **Fixed element type mismatch**: Changed QR code type from `qrcode` to `qr` to match frontend expectations
- **Fixed property names**: 
  - `qrData` → `qrValue`
  - `barcodeData` → `barcodeValue`
  - `barcodeTextSize` → `barcodeFontSize`
- **Added missing properties**: `barcodeTextMargin`, `barcodeTextAlign`
- **Impact**: QR codes and barcodes created via MCP now render correctly in the frontend

#### Asset Search Authentication
- **Fixed 401 Unauthorized errors** in all asset search tools (Pixabay, Unsplash, Iconify, Clipart, Illustrations)
- **Added authentication headers**: All asset search functions now include `Authorization: Bearer ${apiKey}` header
- **Updated AuthContext**: Added `apiKey` property to `AuthContext` interface
- **Updated tool schemas**: Added `apiKey` parameter to all asset search tool input schemas
- **Impact**: Asset searches now work correctly with API key authentication

### Changed
- Updated `ElementTypeEnum` in type definitions
- Updated element capabilities documentation
- Updated tool handlers to pass authentication context

### Documentation
- Added `QR_BARCODE_FIX.md` - Detailed QR/Barcode fix documentation
- Added `ASSET_AUTH_FIX.md` - Detailed asset authentication fix documentation
- Added `MCP_FIXES_SUMMARY.md` - Comprehensive summary of all fixes

## [1.1.0] - 2024-12-19

### Added - Major Feature Release 🎉

#### New Element Types
- **QR Code Element** (`qrcode`) - Generate QR codes for URLs, vCards, WiFi credentials, and more
  - Support for error correction levels (L, M, Q, H)
  - Customizable colors and margins
  - Dynamic content support with template variables
- **Barcode Element** (`barcode`) - Generate barcodes in 10 formats
  - CODE128, CODE39, EAN13, EAN8, UPC, UPCE, ITF14, MSI, pharmacode, codabar
  - Customizable colors, text display, and dimensions
  - Dynamic content support with template variables

#### Comprehensive Documentation
- **ELEMENT_TYPES_GUIDE.md** - Complete guide to all 13 element types
  - Detailed capabilities and limitations for each element
  - Required properties and examples
  - Styling capabilities matrix
  - Dynamic element support documentation
  - Best practices and design patterns
- **ASSET_SEARCH_GUIDE.md** - Complete asset search documentation
  - Detailed information about 5 asset sources (Pixabay, Unsplash, Iconify, Cliparts, Illustrations)
  - 200K+ icons from 150+ icon sets
  - 2.7M+ Pixabay images
  - 3M+ Unsplash photos
  - Search tips and example queries
  - Complete workflow examples
- **ENHANCEMENTS_SUMMARY.md** - Detailed summary of all enhancements
- **element-capabilities.ts** - Programmatic element capabilities reference

#### Enhanced Metadata Resource
- Complete element type capabilities documentation
- Styling capabilities matrix showing what works with each element
- Dynamic element support reference
- Common design patterns (certificates, badges, social posts)
- Enhanced external asset source documentation with:
  - Detailed provider information
  - Popular icon collections (Material Design, Font Awesome, Lucide, etc.)
  - Search tips and example queries
  - Usage examples and workflows
- Font catalog with 30+ professional fonts
  - Font categories and pairing recommendations
  - Style descriptions and best use cases

#### Element Type Enhancements
- Added comprehensive property documentation for all element types
- Documented styling limits and capabilities
- Added QR code properties: `qrData`, `qrColor`, `qrBgColor`, `qrErrorLevel`, `qrMargin`
- Added barcode properties: `barcodeData`, `barcodeFormat`, `barcodeLineColor`, `barcodeBackground`, `barcodeShowText`, `barcodeTextSize`, `barcodeWidth`, `barcodeHeight`

### Improved
- Enhanced asset search documentation with provider-specific details
- Better error messages and validation
- Improved type definitions with detailed descriptions
- Updated README with links to new documentation
- Enhanced package description highlighting new capabilities

### Fixed
- Missing logger import in ws-notify.ts
- Type definitions for new element types

### Documentation
- All changes conform to MCP protocol specifications
- Complete Zod schemas for validation
- Backward compatible with existing implementations

## [1.0.4] - 2025-12-17

### Added
- MCP Protocol compliance improvements
- Professional logger utility that writes to stderr (never stdout)
- MCP_COMPLIANCE.md documentation
- Complete logging refactoring for STDIO transport compliance
- GitHub badge for LobeHub MCP directory
- Comprehensive tool documentation in README
- Missing tool definitions (update_element, delete_element, resize_canvas, clear_canvas, list_templates, apply_template, create_template, list_assets, search_stock_images, search_icons, search_clipart, search_illustrations, list_fonts, upload_asset, generate_design, chat_with_civi, list_shapes)
- Quick Start section in README
- Multiple installation method documentation
- Enhanced configuration examples for different MCP clients
- Requirements section
- Contributing guidelines
- Support section with links

### Fixed
- All tools now properly registered in tool list (previously many were implemented but not exposed)
- Installation instructions updated to match published package name
- Configuration examples corrected to use proper command format

### Improved
- README structure and organization
- Tool and resource descriptions
- Package.json metadata and keywords
- Documentation clarity and completeness

## [1.0.3] - Previous Release

### Added
- Real-time WebSocket synchronization support
- Additional element types and properties
- Template management tools
- Asset search capabilities

## [1.0.2] - Previous Release

### Added
- Canvas manipulation tools
- Design export functionality
- User profile and preferences resources

## [1.0.1] - Previous Release

### Added
- Initial MCP server implementation
- Basic design management tools
- Resource access for designs, canvas, and assets
- Prompt templates for common design tasks

## [1.0.0] - Initial Release

### Added
- First public release
- Core MCP protocol implementation
- Integration with Canvelete API

