# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**🔗 Related Resources:**
- **[Canvelete Platform](https://canvelete.com)** - Main application
- **[Documentation](https://docs.canvelete.com)** - Platform and API documentation

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

