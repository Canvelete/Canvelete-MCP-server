# Testing Canvelete MCP Server

This guide shows different ways to test the MCP server.

## Prerequisites

Before testing, ensure you have:
1. ✅ Built the server (`pnpm run build` in mcp-server directory)
2. ✅ Your Canvelete database running
3. ✅ A valid Canvelete API key (generate from Settings → API Keys)

## Method 1: MCP Inspector (Recommended for Quick Testing)

The MCP Inspector is the easiest way to test your server:

### Run Inspector via npx
```bash
# Set environment variables if needed (or pass via CLI args)
export CANVELETE_API_KEY="your_api_key_here"

npx @modelcontextprotocol/inspector npx @canveletedotcom/mcp-server start
```

This will:
- Start the MCP server
- Open a web UI in your browser
- Let you test resources and tools interactively

### What to Test in Inspector

1. **List Resources** - See all available resources
2. **Read a Resource** - Try `canvelete://designs/list`
3. **Call Tools** - Test `create_design`

## Method 2: Claude Desktop Integration

### Step 1: Create Configuration

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

### Step 2: Restart Claude Desktop

Completely quit and restart Claude Desktop.

### Step 3: Test with Conversations

Try these prompts in Claude:

1. **"What MCP servers are available?"**
   - Should show "canvelete" in the list

2. **"What designs do I have in Canvelete?"**
   - Claude will read `canvelete://designs/list`

## Method 3: Direct Testing with Node

### Test Server Startup

```bash
# Using npx (no install needed)
npx @canveletedotcom/mcp-server start --api-key your_key
```

Expected output:
```
Starting Canvelete MCP Server...
Canvelete MCP Server running on stdio
```

Press `Ctrl+C` to stop.

Expected output:
```
Starting Canvelete MCP Server...
Database connected successfully
Canvelete MCP Server running on stdio
```

Press `Ctrl+C` to stop.

### Test with Input/Output

Create a test file `test-mcp.json`:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

Then:
```bash
cat test-mcp.json | node dist/index.js
```

## Method 4: Automated Test Script

Create `test-server.sh` in the mcp-server directory:

```bash
#!/bin/bash

echo "Testing Canvelete MCP Server..."

# Set environment
export DATABASE_URL="${DATABASE_URL:-postgresql://localhost:5432/canvelete}"
export CANVELETE_API_KEY="${CANVELETE_API_KEY:-test_key}"

# Test 1: Server starts
echo "✓ Testing server startup..."
timeout 2s node dist/index.js 2>&1 | grep -q "Database connected" && echo "✓ Server starts successfully" || echo "✗ Server failed to start"

# Test 2: TypeScript builds
echo "✓ Testing TypeScript build..."
pnpm run build > /dev/null 2>&1 && echo "✓ Build successful" || echo "✗ Build failed"

echo "Testing complete!"
```

Make it executable:
```bash
chmod +x test-server.sh
./test-server.sh
```

## Troubleshooting

### Database Connection Failed
```
Error: Failed to connect to database
```
**Fix:** Check your `DATABASE_URL` is correct and PostgreSQL is running.

### Invalid API Key
```
Error: Invalid API key
```
**Fix:** Generate a fresh API key from Canvelete Settings → API Keys.

### Claude Desktop Doesn't Show Resources
1. Check the config file syntax (valid JSON)
2. Use absolute paths, not relative
3. Restart Claude Desktop completely
4. Check Claude Desktop logs: `~/Library/Logs/Claude/`

### Server Crashes on Startup
```
Error: Cannot find module '@prisma/client'
```
**Fix:** Run `npx prisma generate` in the main Canvelete directory.

## Verification Checklist

- [ ] Server starts without errors
- [ ] Database connection succeeds
- [ ] Can list resources in MCP Inspector
- [ ] Can call tools with valid API key
- [ ] Claude Desktop shows Canvelete server
- [ ] Can ask Claude about Canvelete designs
- [ ] Can create designs through Claude

## Next Steps

Once testing is successful:

1. **Use in Production**: Deploy server alongside main Canvelete app
2. **Create Workflows**: Set up common design workflows in Claude
3. **Monitor Usage**: Check API key usage in Canvelete dashboard
4. **Extend Features**: Add custom prompts for your use cases

## Getting Help

If you encounter issues:
1. Check server logs (stderr output)
2. Verify environment variables are set
3. Test database connection separately
4. Check API key is active and has correct scopes
