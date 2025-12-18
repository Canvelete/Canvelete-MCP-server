# Canvelete MCP Server

[![MCP Badge](https://lobehub.com/badge/mcp-full/canvelete-mcp-server)](https://lobehub.com/mcp/canvelete-mcp-server)

Model Context Protocol (MCP) server for the [Canvelete](https://canvelete.com) design platform. This server exposes Canvelete's design capabilities to AI assistants and other MCP-compatible clients, enabling programmatic design creation and manipulation.

**🔗 Links:**
- **[Canvelete Platform](https://canvelete.com)** - Create designs online
- **[Documentation](https://docs.canvelete.com)** - Full API and platform documentation
- **[Get API Key](https://canvelete.com/settings/api-keys)** - Generate your API key

## Quick Start

```bash
# Install globally
npm install -g @canveletedotcom/mcp-server

# Or use with npx (no installation needed)
npx -y @canveletedotcom/mcp-server start
```

Then configure your MCP client (Claude Desktop, Kiro, etc.) with:

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

## Features

### Resources (Read-Only Data Access)
- **Designs**: Access user designs, browse templates
- **Canvas**: View canvas state and elements
- **Assets**: Browse user's asset library and available fonts
- **User**: Access profile and preferences

### Tools (Actions)
- **Design Management**: Create, update, delete, duplicate, and export designs
- **Canvas Manipulation**: Add, update, delete elements; resize canvas; clear canvas
- **Templates**: List, apply, and create templates
- **Assets**: List assets, search stock images
- **AI Integration**: Access Civi AI for design generation

### Available Prompts

Prompts provide guided templates for common design tasks:

- **`create_social_post`** - Create social media posts (Instagram, Facebook, Twitter, etc.)
- **`create_presentation_slide`** - Create presentation slides with title and content
- **`add_text_element`** - Add styled text elements to designs

Prompts help AI assistants create designs with proper structure and styling automatically.

## Installation

### Method 1: Global Installation (Recommended)

Install the package globally to use the `canvelete-mcp` command:

```bash
npm install -g @canveletedotcom/mcp-server
```

### Method 2: NPX (No Installation Required)

Use npx to run without installing:

```bash
npx -y @canveletedotcom/mcp-server start
```

### Method 3: Local Development

For development or custom builds:

```bash
git clone https://github.com/canvelete/canvelete.git
cd canvelete/mcp-server
npm install
npm run build
```

Then use the local build path in your MCP configuration.

## Configuration

### Environment Variables

Create a `.env` file in the mcp-server directory:

```env
# Required: Canvelete API Key
CANVELETE_API_KEY =your_api_key_here

# Optional: Canvelete API URL (defaults to https://www.canvelete.com)
CANVELETE_API_URL=https://www.canvelete.com

# Optional: For AI generation features (if using Civi AI directly)
GEMINI_API_KEY=your_gemini_api_key
```

### Authentication

You need a Canvelete API key to use the MCP server:

1. Log in to your [Canvelete account](https://canvelete.com)
2. Go to [Settings → API Keys](https://canvelete.com/settings/api-keys)
3. Generate a new API key
4. Save the key securely

For detailed API documentation, see [docs.canvelete.com](https://docs.canvelete.com).

You can provide the API key in two ways:

**Option 1: Environment Variable** (recommended for Claude Desktop)
```env
CANVELETE_API_KEY=your_api_key_here
```

**Option 2: Tool Arguments** (for programmatic use)
```json
{
  "apiKey": "your_api_key_here",
  "name": "My Design"
}
```

## Configuration

### Claude Desktop

1. Find your Claude Desktop config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add the Canvelete server configuration:

**Option A: Using Global Installation**
```json
{
  "mcpServers": {
    "canvelete-mcp-server": {
      "command": "canvelete-mcp",
      "args": ["start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here",
        "CANVELETE_API_URL": "https://www.canvelete.com"
      }
    }
  }
}
```

**Option B: Using NPX (No Installation)**
```json
{
  "mcpServers": {
    "canvelete-mcp-server": {
      "command": "npx",
      "args": ["-y", "@canveletedotcom/mcp-server", "start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here",
        "CANVELETE_API_URL": "https://www.canvelete.com"
      }
    }
  }
}
```

**Option C: Using Local Build**
```json
{
  "mcpServers": {
    "canvelete-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.cjs", "start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here",
        "CANVELETE_API_URL": "https://www.canvelete.com"
      }
    }
  }
}
```

3. Restart Claude Desktop

### Kiro

1. Find your Kiro config file: `~/.kiro/settings/mcp.json`

2. Add the same configuration as above

3. Restart Kiro

### Other MCP Clients

Any MCP-compatible client can use this server. Configure it to run:
- Command: `canvelete-mcp` (if installed globally) or `npx -y @canveletedotcom/mcp-server`
- Args: `["start"]`
- Environment: Set `CANVELETE_API_KEY` and optionally `CANVELETE_API_URL`

## Usage Examples

### Example Conversations

Once configured, you can ask your AI assistant:

- **"What designs do I have in Canvelete?"**
- **"Create a new 1080x1080 Instagram post design called 'Summer Sale'"**
- **"Add a text element to design {id} that says 'Hello World'"**
- **"Export design {id} as PNG"**
- **"List all my uploaded assets"**
- **"Apply template {template-id} to design {design-id}"**
- **"Create a presentation slide with title 'Welcome' and subtitle 'Introduction'"**
- **"Search for stock images of mountains"**

### Quick Example: Create a Social Media Post

```javascript
// 1. Create a design
create_design({
  name: "Summer Sale Post",
  width: 1080,
  height: 1080
})

// 2. Add background
add_element({
  designId: "{design-id}",
  element: {
    type: "rectangle",
    x: 0, y: 0,
    width: 1080, height: 1080,
    fill: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
})

// 3. Add text
add_element({
  designId: "{design-id}",
  element: {
    type: "text",
    text: "SUMMER SALE",
    x: 100, y: 400,
    width: 880, height: 150,
    fontSize: 96,
    fontFamily: "Poppins",
    fill: "#FFFFFF",
    fontWeight: "bold"
  }
})

// 4. Export
export_design({
  designId: "{design-id}",
  format: "png",
  quality: 100
})
```

See [EXAMPLES.md](./EXAMPLES.md) for more detailed examples. For complete API documentation, visit [docs.canvelete.com](https://docs.canvelete.com).

## Available Resources

Resources provide read-only access to Canvelete data:

| URI | Description |
|-----|-------------|
| `canvelete://api/designs/list` | List all user's designs with pagination |
| `canvelete://api/designs/templates` | Browse public design templates |
| `canvelete://api/design/{id}` | Get detailed information about a specific design |
| `canvelete://api/canvas/{designId}` | Get the current canvas state for a design |
| `canvelete://api/canvas/{designId}/elements` | Get all elements on a design canvas |
| `canvelete://api/assets/library` | User's uploaded assets (images, fonts, etc.) |
| `canvelete://api/assets/fonts` | List of all available fonts for text elements |
| `canvelete://api/user/profile` | User profile and subscription information |
| `canvelete://api/user/preferences` | User editor preferences and settings |
| `canvelete://api/metadata/schema` | System metadata, schemas, and property definitions |

## Available Tools

### Design Management Tools
- **`list_designs`** - List all user's designs with pagination and search
- **`get_design`** - Get detailed design info including canvas data
- **`create_design`** - Create new design with custom dimensions
- **`update_design`** - Update design properties (name, description, visibility)
- **`delete_design`** - Delete a design permanently
- **`duplicate_design`** - Fork/copy an existing design
- **`export_design`** - Export design to PNG, JPG, PDF, or SVG format

### Canvas Manipulation Tools
- **`add_element`** - Add any element type (shape, text, image, SVG, etc.)
- **`update_element`** - Modify element properties (position, style, content)
- **`delete_element`** - Remove an element from canvas
- **`resize_canvas`** - Change canvas dimensions
- **`clear_canvas`** - Remove all elements from canvas

### Template Tools
- **`list_templates`** - Browse available design templates
- **`apply_template`** - Apply a template to an existing design
- **`create_template`** - Save a design as a reusable template

### Asset Management Tools
- **`list_assets`** - View user's asset library (images, fonts, etc.)
- **`search_stock_images`** - Search Pixabay for stock images
- **`search_icons`** - Search for icon assets
- **`search_clipart`** - Search for clipart images
- **`search_illustrations`** - Search for illustration assets
- **`list_fonts`** - List available fonts by category
- **`upload_asset`** - Upload a new asset to the library

### AI Tools
- **`generate_design`** - Generate designs using AI
- **`chat_with_civi`** - Interact with Civi AI for design assistance

## Element Types

Supported canvas element types:

- **rectangle** - Rectangular shapes
- **circle** - Circular/elliptical shapes
- **text** - Text elements with fonts
- **image** - Images from URLs or assets
- **line** - Straight lines
- **polygon** - Multi-sided shapes
- **star** - Star shapes
- **svg** - SVG graphics
- **bezier** - Curved paths
- **container** - Group elements
- **table** - Data tables

## Development

### Build
```bash
npm run build
```

### Run in Development
```bash
npm run dev
```

### Type Check
```bash
npm run type-check
```

### Clean Build
```bash
npm run clean
npm run build
```

## Troubleshooting

### "Invalid API key"
- Generate a new API key in Canvelete Settings → API Keys
- Verify the key is set correctly in your MCP config
- Check key hasn't expired or been revoked
- Run the test script to verify: `npx tsx test-auth.ts your_api_key`

### "Permission denied"
- Ensure API key has appropriate scopes
- Verify you own the resource you're modifying

### "Failed to connect to API"
- Check `CANVELETE_API_URL` is correct (default: https://www.canvelete.com)
- Verify network connectivity to the Canvelete API
- For local development, ensure the Canvelete app is running

### Claude Desktop doesn't show resources
- Restart Claude Desktop
- Check the config file syntax
- Verify the server path is absolute
- Check stderr logs for errors

## Real-time Sync

The MCP server supports real-time synchronization with the design editor via WebSocket. When you make changes through MCP tools, the editor will instantly update to reflect those changes.

### Setup

1. Start the WebSocket server (in the main Canvelete directory):
```bash
pnpm ws
```

2. The WebSocket server runs on port 3001 by default. You can change this with the `WS_PORT` environment variable.

3. Open the design editor - you'll see a sync indicator in the top-right corner showing connection status.

### How it works

- When MCP tools modify a design (add/update/delete elements, resize canvas, etc.), the changes are broadcast via WebSocket
- All connected editor clients subscribed to that design receive instant updates
- The editor shows a "Live" indicator when connected, with a count of received updates

### Environment Variables

```env
# WebSocket server port (default: 3001)
WS_PORT=3001

# WebSocket server URL for MCP server to connect to
WS_SERVER_URL=ws://localhost:3001/ws
```

## Security & Privacy

### API Key Security

- **Never commit API keys** to version control or share them publicly
- **Use environment variables** or secure configuration files
- **Rotate keys regularly** if compromised or exposed
- **Use separate keys** for development and production

### Data Privacy

- The MCP server accesses your Canvelete account data through API keys
- All API communication uses HTTPS encryption
- API keys have scoped permissions based on your account settings
- Review your API key permissions in Canvelete Settings → API Keys

### Rate Limiting

- API keys may have rate limits based on your subscription plan
- The server respects rate limits and will return appropriate errors
- Check your subscription plan for rate limit details

### Best Practices

- Only use trusted API keys from your own account
- Don't share your API keys with untrusted parties
- Monitor your API usage in Canvelete dashboard
- Report security issues to security@canvelete.com (do not open public issues)

## Deployment Modes

The Canvelete MCP Server supports both **local** and **cloud** deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Local Deployment (Default)

The server runs locally on your machine using stdio transport, which is the standard for MCP clients like Claude Desktop, Kiro, and Cursor.

**Advantages:**
- ✅ Full control over your environment
- ✅ No network latency
- ✅ Data stays on your machine
- ✅ Simple setup and configuration
- ✅ Works offline (once API key is cached)

**Use Cases:**
- Personal development
- Testing and debugging
- Privacy-sensitive workflows
- Desktop applications (Claude Desktop, Cursor, etc.)

### Cloud Deployment

The server can be deployed to cloud platforms using containerization or serverless functions. The stdio transport works seamlessly in cloud environments.

**Advantages:**
- ✅ Scalable and always available
- ✅ No local resource usage
- ✅ Accessible from multiple devices
- ✅ Managed infrastructure
- ✅ Easy updates and maintenance

**Supported Platforms:**
- **Docker/Containers**: Deploy to any container platform (Docker, Kubernetes, etc.)
- **Google Cloud Run**: Serverless container platform
- **Azure Functions**: Serverless with custom handlers
- **AWS Lambda**: Serverless functions (with stdio adapter)
- **Vercel/Netlify**: Serverless platforms
- **Any Node.js hosting**: Railway, Render, Fly.io, etc.

**Quick Cloud Examples:**

```bash
# Docker deployment (using published package)
docker build -f Dockerfile.simple -t canvelete-mcp-server .
docker run -e CANVELETE_API_KEY=your_key canvelete-mcp-server

# Or use docker-compose
docker-compose up -d
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guides for:
- Docker/Containers (Dockerfile included)
- Google Cloud Run
- Azure Functions
- AWS Lambda
- Railway, Render, Fly.io
- Vercel/Netlify

## Requirements

- **Node.js**: >= 18.0.0
- **Canvelete Account**: Sign up at [canvelete.com](https://canvelete.com)
- **Canvelete API Key**: Get one from [Canvelete Settings → API Keys](https://canvelete.com/settings/api-keys)
- **Documentation**: See [docs.canvelete.com](https://docs.canvelete.com) for API reference

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Quick steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed contribution guidelines, code standards, and development setup, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes and version history.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Support

For issues and questions:
- **GitHub Issues**: [canvelete/canvelete/issues](https://github.com/canvelete/canvelete/issues)
- **Platform Documentation**: [docs.canvelete.com](https://docs.canvelete.com)
- **Canvelete Platform**: [canvelete.com](https://canvelete.com)
- **API Documentation**: [docs.canvelete.com/api](https://docs.canvelete.com/api)
- **Get Help**: Visit [canvelete.com/support](https://canvelete.com/support) or [docs.canvelete.com/help](https://docs.canvelete.com/help)

## Deployment Architecture

### How It Works

The MCP server uses **stdio transport** by default, which works in both local and cloud environments:

1. **Local Mode**: MCP clients (Claude Desktop, etc.) spawn the server process and communicate via stdin/stdout
2. **Cloud Mode**: Cloud platforms run the server in containers/functions and handle stdio communication through their infrastructure

### Data Flow

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│ MCP Client  │ ◄──────► │ MCP Server   │ ◄──────► │ Canvelete   │
│ (Claude)    │  stdio  │ (This Server)│  HTTPS  │    API      │
└─────────────┘         └──────────────┘         └─────────────┘
```

- **MCP Protocol**: JSON-RPC over stdio (local) or HTTP/SSE (cloud)
- **Canvelete API**: Always HTTPS to `https://canvelete.com`

### Choosing Deployment Mode

**Use Local Deployment if:**
- You're using Claude Desktop, Cursor, or other desktop MCP clients
- You want maximum privacy and control
- You're developing or testing
- You have a single user/machine

**Use Cloud Deployment if:**
- You need 24/7 availability
- You want to share access across multiple devices
- You need scalability for multiple users
- You prefer managed infrastructure

## Related Links

### Canvelete Resources
- **[Canvelete Platform](https://canvelete.com)** - Create and edit designs online
- **[Documentation](https://docs.canvelete.com)** - Complete platform and API documentation
- **[API Reference](https://docs.canvelete.com/api)** - Detailed API documentation
- **[Get Started Guide](https://docs.canvelete.com/getting-started)** - Platform getting started guide

### MCP Resources
- [MCP Server Directory](https://lobehub.com/mcp/canvelete-mcp-server)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [MCP Cloud Deployment Guide](https://modelcontextprotocol.io/docs/deployment)
