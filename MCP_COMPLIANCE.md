# MCP Protocol Compliance

This document outlines how the Canvelete MCP Server adheres to the [Model Context Protocol (MCP) specification](https://modelcontextprotocol.io/docs/develop/build-server).

## Protocol Documentation Reference

This implementation follows the official MCP protocol documentation:
- **[Build an MCP Server Guide](https://modelcontextprotocol.io/docs/develop/build-server)** - Complete guide for building compliant MCP servers
- **[MCP Specification](https://spec.modelcontextprotocol.io/)** - Official protocol specification
- **[MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)** - TypeScript SDK reference

## ✅ Compliance Checklist

### Logging (Critical)

**✅ COMPLIANT**: All logging uses stderr, never stdout

According to MCP protocol documentation:
> **For STDIO-based servers:** Never write to standard output (stdout). This includes `print()` statements in Python, `console.log()` in JavaScript, etc. Writing to stdout will corrupt the JSON-RPC messages and break your server.

**Implementation:**
- ✅ Created dedicated `logger` utility (`src/utils/logger.ts`) that writes to `process.stderr`
- ✅ All `console.log()`, `console.error()`, `console.warn()` calls replaced with logger
- ✅ Logger includes timestamps and proper formatting
- ✅ Debug logging only enabled in development mode

**Files Updated:**
- `src/index.ts` - Server startup and main logic
- `src/utils/errors.ts` - Error logging
- `src/tools/asset-tools.ts` - Asset tool error handling
- `src/api-client.ts` - API request error handling
- `src/tools/template-tools.ts` - Template tool error handling
- `src/utils/ws-notify.ts` - WebSocket notification logging

### Server Structure

**✅ COMPLIANT**: Proper MCP server initialization

- ✅ Uses `@modelcontextprotocol/sdk` Server class
- ✅ Properly configured with name and version
- ✅ Capabilities properly declared (resources, tools, prompts)
- ✅ Uses `StdioServerTransport` for local deployment

### Transport

**✅ COMPLIANT**: STDIO transport implementation

- ✅ Uses `StdioServerTransport` from MCP SDK
- ✅ Properly connects server to transport
- ✅ Handles stdio communication correctly

### Error Handling

**✅ COMPLIANT**: Proper error handling and formatting

- ✅ Custom error classes for different error types
- ✅ Errors formatted according to MCP protocol
- ✅ Error responses include proper codes and messages
- ✅ All errors logged to stderr

### Tool Definitions

**✅ COMPLIANT**: All tools properly defined

- ✅ Tools have clear descriptions
- ✅ Input schemas properly defined with types
- ✅ Required parameters marked
- ✅ Default values provided where appropriate
- ✅ All tools registered in tool list handler

### Resource Definitions

**✅ COMPLIANT**: Resources properly defined

- ✅ Resources have unique URIs
- ✅ Proper descriptions and MIME types
- ✅ Resource handlers implemented
- ✅ Error handling for invalid resources

### Prompt Definitions

**✅ COMPLIANT**: Prompts properly implemented

- ✅ Prompts have clear names and descriptions
- ✅ Prompt arguments properly handled
- ✅ Prompt content generation works correctly

## Best Practices Followed

### 1. Logging Best Practices

```typescript
// ❌ BAD - Never do this in STDIO servers
console.log('Processing request');

// ✅ GOOD - Use logger (writes to stderr)
logger.info('Processing request');
```

### 2. Error Handling

```typescript
// ✅ Proper error formatting for MCP responses
try {
    // ... operation
} catch (error) {
    logger.error('Operation failed', error);
    return {
        content: [{ type: 'text', text: JSON.stringify(formatError(error), null, 2) }],
        isError: true,
    };
}
```

### 3. Server Initialization

```typescript
// ✅ Proper server setup
const server = new Server(
    {
        name: 'canvelete-mcp-server',
        version: '1.0.4',
    },
    {
        capabilities: {
            resources: {},
            tools: {},
            prompts: {},
        },
    }
);
```

## Testing Compliance

### Verify Logging

```bash
# Start server and verify logs go to stderr
canvelete-mcp start 2> server.log

# Check that stdout is clean (only JSON-RPC messages)
canvelete-mcp start > stdout.log 2> stderr.log
```

### Verify Protocol Compliance

Use the MCP Inspector to verify:
```bash
npx @modelcontextprotocol/inspector canvelete-mcp start
```

## Protocol Documentation Compliance

### Core MCP Concepts (from [official docs](https://modelcontextprotocol.io/docs/develop/build-server))

The MCP protocol defines three main capabilities that servers can provide:

1. **Resources** ✅ - File-like data that can be read by clients
   - Our server provides 10 resources (designs, canvas, assets, user, metadata)
   - All resources have proper URIs, descriptions, and MIME types
   - Resource handlers properly implemented

2. **Tools** ✅ - Functions that can be called by the LLM
   - Our server provides 20+ tools (design management, canvas manipulation, assets, AI)
   - All tools have clear descriptions and proper input schemas
   - Tools properly registered in tool list handler

3. **Prompts** ✅ - Pre-written templates for specific tasks
   - Our server provides 3 prompts (social posts, presentation slides, text elements)
   - Prompts properly implemented with argument handling

### Logging Requirements (Critical)

From the [official documentation](https://modelcontextprotocol.io/docs/develop/build-server#logging-in-mcp-servers):

> **For STDIO-based servers:** Never write to standard output (stdout). This includes `console.log()` in JavaScript. Writing to stdout will corrupt the JSON-RPC messages and break your server.

**✅ COMPLIANT**: 
- All logging uses our custom `logger` utility that writes to `process.stderr`
- No `console.log()` calls in production code
- All error logging goes to stderr
- Debug logging only enabled in development mode

### Server Initialization

Following the [TypeScript SDK patterns](https://modelcontextprotocol.io/docs/develop/build-server):

**✅ COMPLIANT**:
```typescript
const server = new Server(
    {
        name: 'canvelete-mcp-server',
        version: '1.0.4',
    },
    {
        capabilities: {
            resources: {},
            tools: {},
            prompts: {},
        },
    }
);
```

### Transport Implementation

**✅ COMPLIANT**:
- Uses `StdioServerTransport` from MCP SDK
- Properly connects server to transport
- Handles stdio communication correctly
- No stdout interference

### Error Handling

**✅ COMPLIANT**:
- Errors properly formatted according to MCP protocol
- Error responses include proper codes and messages
- Unknown tools return proper error messages
- All errors logged to stderr

### Tool Execution Flow

Following the [documentation's flow](https://modelcontextprotocol.io/docs/develop/build-server#whats-happening-under-the-hood):

1. ✅ Client sends request to server
2. ✅ Server analyzes available tools
3. ✅ Server executes chosen tool(s)
4. ✅ Results formatted and returned
5. ✅ Errors properly handled and logged

## Testing Compliance

### Using MCP Inspector

As recommended in the [official documentation](https://modelcontextprotocol.io/docs/develop/build-server):

```bash
npx @modelcontextprotocol/inspector canvelete-mcp start
```

This will:
- Verify server starts correctly
- Test all tools are properly registered
- Verify resources are accessible
- Check prompts are available
- Validate JSON-RPC communication

### Claude Desktop Integration

Following the [Claude Desktop setup guide](https://modelcontextprotocol.io/docs/develop/build-server#testing-your-server-with-claude-for-desktop):

**✅ Configuration Format**:
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

## Troubleshooting (per MCP docs)

### Server Not Showing Up

From the [troubleshooting guide](https://modelcontextprotocol.io/docs/develop/build-server#troubleshooting):

1. ✅ Check config file syntax (validated)
2. ✅ Verify absolute paths (documented)
3. ✅ Restart Claude Desktop completely (documented)

### Getting Logs

**✅ COMPLIANT**: Our server logs to stderr, which Claude Desktop captures:
- `~/Library/Logs/Claude/mcp-server-canvelete-mcp-server.log` (macOS)
- Logs include all error information
- Debug information available in development mode

## References

- **[MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/)** - Official protocol specification
- **[Build an MCP Server Guide](https://modelcontextprotocol.io/docs/develop/build-server)** - Official tutorial and best practices
- **[Resources Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/resources)** - Resource protocol details
- **[Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools)** - Tool protocol details
- **[Prompts Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/prompts)** - Prompt protocol details
- **[MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)** - TypeScript SDK reference
- **[MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)** - Testing and debugging tool

## Full Specification Compliance

For detailed compliance with the official MCP specification (2025-11-25), see [SPECIFICATION_COMPLIANCE.md](./SPECIFICATION_COMPLIANCE.md).

## Maintenance

When adding new code:
1. ✅ Always use `logger` instead of `console.*`
2. ✅ Test that stdout remains clean (JSON-RPC only)
3. ✅ Verify error handling follows MCP protocol
4. ✅ Ensure all tools/resources/prompts are properly registered
5. ✅ Run MCP Inspector to verify compliance

