# Canvelete MCP Server Setup Guide

## Understanding MCP Configuration vs Terminal Usage

**Important**: The MCP configuration file is used by **Kiro/Claude** to start the server, NOT by your terminal commands.

### MCP Config (for Kiro/Claude)
Location: `~/.kiro/settings/mcp.json`

This config tells Kiro how to start your MCP server with the API key.

### Terminal Commands (for testing)
When you run `canvelete-mcp` in your terminal, it uses your terminal's environment, not the MCP config.

---

## ✅ Correct MCP Configuration

Your MCP config at `~/.kiro/settings/mcp.json`:

```json
{
  "mcpServers": {
    "canvelete": {
      "command": "node",
      "args": ["/Users/mac/Documents/Canvelete.com/mcp-server/dist/index.cjs", "start"],
      "env": {
        "CANVELETE_API_KEY": "cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195",
        "CANVELETE_API_URL": "https://canvelete.com"
      }
    }
  }
}
```

**Key points:**
- ✅ File is `index.cjs` (not `index.js`)
- ✅ Added `"start"` command in args
- ✅ API key is set in env
- ✅ API URL is set

---

## Testing the MCP Server

### Option 1: Test with Environment Variables (Recommended)

```bash
# Set API key for this command only
CANVELETE_API_KEY=cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195 \
  node dist/index.cjs inspect

# Output should show:
# API Key Present: true
```

### Option 2: Export Environment Variable

```bash
# Set for entire terminal session
export CANVELETE_API_KEY=cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195
export CANVELETE_API_URL=https://canvelete.com

# Now all commands will use it
canvelete-mcp inspect
# Output: API Key Present: true
```

### Option 3: Use .env File

Create a `.env` file in your project:

```bash
echo 'CANVELETE_API_KEY=cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195' >> .env
echo 'CANVELETE_API_URL=https://canvelete.com' >> .env
```

The server will automatically load it when started.

---

## Testing MCP Protocol

Test the full MCP protocol with your API key:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | \
CANVELETE_API_KEY=cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195 \
node dist/index.cjs start
```

You should see a JSON response with server info.

---

## Using with Kiro

Once your MCP config is set up (which it is now), Kiro will automatically:

1. Start the MCP server using the config
2. Pass the API key via environment variables
3. Connect to the server via stdio

**To use in Kiro:**

1. Restart Kiro to reload the MCP config
2. In chat, you can now ask things like:
   - "List my Canvelete designs"
   - "Create a new design called 'Test'"
   - "Show me my Canvelete assets"

Kiro will automatically use the Canvelete MCP tools!

---

## Alternative: Use Published Package

Instead of using the local build, you can use the published npm package:

```json
{
  "mcpServers": {
    "canvelete": {
      "command": "npx",
      "args": ["-y", "@canveletedotcom/mcp-server", "start"],
      "env": {
        "CANVELETE_API_KEY": "cvt_4c6fedb10fc58709c9bcd4d6619b33b8960203d388fd1e1aa7131de90c908195",
        "CANVELETE_API_URL": "https://canvelete.com"
      }
    }
  }
}
```

**Benefits:**
- Always uses latest published version
- No need to maintain local build
- Easier to share with team

---

## Troubleshooting

### "API Key Present: false" when running in terminal

This is **normal** if you didn't set the environment variable. The MCP config only applies when Kiro starts the server, not when you run commands manually.

**Solution**: Set the env var before running:
```bash
CANVELETE_API_KEY=your_key canvelete-mcp inspect
```

### Server not starting in Kiro

1. Check the MCP config file exists: `~/.kiro/settings/mcp.json`
2. Verify the path to `index.cjs` is correct
3. Restart Kiro
4. Check Kiro's MCP logs for errors

### Wrong file extension

Make sure you're using `index.cjs` not `index.js`:
- ❌ Wrong: `/path/to/dist/index.js`
- ✅ Correct: `/path/to/dist/index.cjs`

---

## Quick Reference

### Local Development
```bash
# Build
npm run build

# Test with API key
CANVELETE_API_KEY=your_key node dist/index.cjs inspect

# Start server
CANVELETE_API_KEY=your_key node dist/index.cjs start
```

### MCP Config Locations
- **Kiro**: `~/.kiro/settings/mcp.json`
- **Claude Desktop (macOS)**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Claude Desktop (Windows)**: `%APPDATA%\Claude\claude_desktop_config.json`

### Environment Variables
- `CANVELETE_API_KEY` - Your API key (required)
- `CANVELETE_API_URL` - API URL (default: https://canvelete.com)
- `WS_SERVER_URL` - WebSocket URL for real-time sync (optional)

---

## Summary

✅ Your MCP config is now correct  
✅ The server will work when Kiro starts it  
✅ To test in terminal, set environment variables manually  
✅ The MCP config and terminal commands use different environments  

**Next step**: Restart Kiro and try asking it about your Canvelete designs!
