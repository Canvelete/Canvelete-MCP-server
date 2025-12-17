# Setting Up Canvelete MCP Server with Cursor

Cursor IDE has MCP support! Here's how to configure it:

## Step 1: Locate Cursor's MCP Configuration

Cursor stores MCP configuration at:
```
~/.cursor/mcp.json
```

If this file doesn't exist, create it.

## Step 2: Add Canvelete Server Configuration

Edit `~/.cursor/mcp.json` and add:

```json
{
  "mcpServers": {
    "canvelete": {
      "command": "npx",
      "args": [
        "-y",
        "@canveletedotcom/mcp-server", 
        "start"
      ],
      "env": {
        "CANVELETE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

*Alternatively, if you installed it globally (`npm install -g @canveletedotcom/mcp-server`):*

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

**Important:** Replace:
- `postgresql://user:password@localhost:5432/canvelete` with your actual database URL
- `your_api_key_here` with your Canvelete API key (generate from Settings → API Keys)

## Step 3: Restart Cursor

Completely quit and restart Cursor for the changes to take effect.

## Step 4: Test in Cursor

Once restarted, you can use Cursor's AI features with MCP:

### Using Cursor Composer or Chat

Try these prompts:

1. **"What MCP tools are available?"**
   - Cursor should list Canvelete tools

2. **"@canvelete What designs do I have?"**
   - Uses the `canvelete://designs/list` resource

3. **"@canvelete Create a new 1080x1080 Instagram post called 'Test Post'"**
   - Uses the `create_design` tool

4. **"@canvelete Show my user profile"**
   - Reads `canvelete://user/profile`

5. **"@canvelete List all templates"**
   - Reads `canvelete://designs/templates`

## Alternative: Quick Testing with MCP Inspector

If you want to test the server without configuring Cursor first:

```bash
# Set environment variables
export DATABASE_URL="postgresql://user:password@localhost:5432/canvelete"
export CANVELETE_API_KEY="your_api_key_here"

# Run MCP Inspector (opens web UI)
npx @modelcontextprotocol/inspector node /Users/mac/Documents/Canvelete.com/canvelete/mcp-server/dist/index.js
```

This opens a web interface where you can test all resources and tools interactively.

## Troubleshooting

### Cursor Doesn't See the Server
1. Check `~/.cursor/mcp.json` exists and is valid JSON
2. Ensure absolute paths are used (not relative)
3. Restart Cursor completely
4. Check Cursor's logs/console for errors

### Server Fails to Start
1. Verify `DATABASE_URL` is correct
2. Ensure PostgreSQL is running
3. Check API key is valid
4. Test server manually: `node /Users/mac/Documents/Canvelete.com/canvelete/mcp-server/dist/index.js`

### Database Connection Error
```bash
# Test database connection
psql "postgresql://user:password@localhost:5432/canvelete" -c "SELECT 1"
```

## What You Can Do with MCP in Cursor

### Design Management
- "Create a 1920x1080 presentation slide"
- "List all my designs"
- "Export design {id} as PNG"
- "Duplicate design {id} with name 'Copy of Design'"

### Canvas Manipulation
- "Add a text element saying 'Hello World' to design {id}"
- "Update element {element-id} to change its color to red"
- "Clear all elements from design {id}"
- "Resize canvas to 1200x800"

### Templates
- "Show me all social media templates"
- "Apply template {template-id} to design {design-id}"
- "Create a template from design {id}"

### Assets
- "List all my uploaded images"
- "Show available fonts"

## Tips for Best Results

1. **Be Specific**: Include design IDs when modifying designs
2. **Use Natural Language**: Cursor will translate to appropriate MCP calls
3. **Chain Operations**: "Create a design, add a text element, then export it"
4. **Reference Resources**: "@canvelete" prefix helps Cursor route to the MCP server

## Next Steps

After configuration:
1. Generate your Canvelete API key (if you haven't)
2. Update the config with your credentials
3. Restart Cursor
4. Test with simple queries
5. Build more complex design workflows!
