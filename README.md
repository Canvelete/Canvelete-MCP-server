# Canvelete MCP Server

Model Context Protocol (MCP) server for the Canvelete design platform. This server exposes Canvelete's design capabilities to AI assistants and other MCP-compatible clients, enabling programmatic design creation and manipulation.

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

### Prompts (Guided Templates)
- Create social media posts
- Create presentation slides
- Add text elements

## Installation

### Method 1: Global Installation (Recommended)
This gives you the `canvelete-mcp` command globally.

```bash
npm install -g @canveletedotcom/mcp-server
# or
pnpm add -g @canveletedotcom/mcp-server
```

### Method 2: Use via npx
Run without installing:
```bash
npx @canveletedotcom/mcp-server start
```

## Configuration

### Environment Variables

You need a Canvelete API key.

1. Log in to your Canvelete account
2. Go to Settings → API Keys
3. Generate a new API key

### Usage with Claude Desktop

1. Open your Claude Desktop config file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the Canvelete server configuration:

```json
{
  "mcpServers": {
    "canvelete": {
      "command": "canvelete-mcp",
      "args": ["start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

*Note: If you haven't installed it globally, you can use `npx`:*

```json
{
  "mcpServers": {
    "canvelete": {
      "command": "npx",
      "args": ["-y", "@canveletedotcom/mcp-server", "start"],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

4. Restart Claude Desktop

### Example Conversations

Once configured, you can ask Claude:

- **"What designs do I have in Canvelete?"**
- **"Create a new 1080x1080 Instagram post design called 'Summer Sale'"**
- **"Add a text element to design {id} that says 'Hello World'"**
- **"Export design {id} as PNG"**
- **"List all my uploaded assets"**
- **"Apply template {template-id} to design {design-id}"**

## Available Resources

| URI | Description |
|-----|-------------|
| `canvelete://designs/list` | List user's designs |
| `canvelete://designs/templates` | Browse templates |
| `canvelete://design/{id}` | Get specific design |
| `canvelete://canvas/{designId}` | Get canvas state |
| `canvelete://canvas/{designId}/elements` | Get canvas elements |
| `canvelete://assets/library` | User's assets |
| `canvelete://assets/fonts` | Available fonts |
| `canvelete://user/profile` | User profile |
| `canvelete://user/preferences` | User preferences |

## Available Tools

### Design Tools
- `list_designs` - List all user's designs
- `get_design` - Get detailed design info including canvas data
- `create_design` - Create new design
- `update_design` - Update design properties
- `delete_design` - Delete design
- `duplicate_design` - Fork/copy design
- `export_design` - Export to PNG/JPG/PDF/SVG

### Canvas Tools
- `add_element` - Add shape, text, image, etc.
- `update_element` - Modify element properties
- `delete_element` - Remove element
- `resize_canvas` - Change dimensions
- `clear_canvas` - Remove all elements

### Template Tools
- `list_templates` - Browse templates
- `apply_template` - Apply to design
- `create_template` - Save as template

### Asset Tools
- `list_assets` - View asset library
- `search_stock_images` - Search Pixabay

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
- Check `CANVELETE_API_URL` is correct (default: https://canvelete.com)
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

## Security Notes

- **API Keys**: Keep your API keys secure. Never commit them to version control.
- **Database Access**: The MCP server has full database access. Only use trusted API keys.
- **Rate Limiting**: API keys may have rate limits. Check your subscription plan.

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [canvelete/issues](https://github.com/canvelete/canvelete)
- Documentation: [canvelete.com/docs](https://canvelete.com/docs)
