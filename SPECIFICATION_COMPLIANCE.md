# MCP Specification Compliance (2025-11-25)

This document details how the Canvelete MCP Server complies with the [official MCP Specification](https://spec.modelcontextprotocol.io/).

## Protocol Revision

**Protocol Version**: 2025-11-25

## Capabilities Declaration

### Resources Capability

**✅ COMPLIANT** - Per [Resources Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/resources#capabilities):

```typescript
resources: {
    listChanged: true, // Server will notify when resource list changes
}
```

- ✅ Declares `resources` capability
- ✅ Supports `listChanged` notifications
- ✅ All resources have proper URIs, names, descriptions, and MIME types
- ✅ Resource handlers properly implemented

### Tools Capability

**✅ COMPLIANT** - Per [Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools#capabilities):

```typescript
tools: {
    listChanged: true, // Server will notify when tool list changes
}
```

- ✅ Declares `tools` capability
- ✅ Supports `listChanged` notifications
- ✅ All tools have proper names, descriptions, and input schemas
- ✅ Tool execution properly handles errors

### Prompts Capability

**✅ COMPLIANT** - Per [Prompts Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/prompts#capabilities):

```typescript
prompts: {
    listChanged: true, // Server will notify when prompt list changes
}
```

- ✅ Declares `prompts` capability
- ✅ Supports `listChanged` notifications
- ✅ All prompts have proper names, titles, descriptions, and arguments

## Tool Name Compliance

**✅ COMPLIANT** - Per [Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools#tool-names):

- ✅ Tool names are 1-128 characters in length
- ✅ Tool names are case-sensitive
- ✅ Only allowed characters: A-Z, a-z, 0-9, underscore (_), hyphen (-), and dot (.)
- ✅ No spaces, commas, or other special characters
- ✅ Tool names are unique within the server

**Examples of compliant tool names:**
- `list_designs` ✅
- `create_design` ✅
- `add_element` ✅
- `590_add_element` ✅ (alias for compatibility)

## Input Schema Compliance

**✅ COMPLIANT** - Per [Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools#data-types):

- ✅ All input schemas are valid JSON Schema objects (not null)
- ✅ Schemas follow JSON Schema 2020-12 (default)
- ✅ Required parameters properly marked
- ✅ Default values provided where appropriate
- ✅ Enum values properly defined

**Example compliant schema:**
```typescript
{
    name: 'create_design',
    description: 'Create a new design',
    inputSchema: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Design name' },
            width: { type: 'number', description: 'Canvas width in pixels', default: 1920 },
        },
        required: ['name'],
    },
}
```

## Error Handling Compliance

**✅ COMPLIANT** - Per [Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools#error-handling):

### Protocol Errors

Protocol errors are thrown and handled by the MCP SDK with proper JSON-RPC error codes:
- Unknown tool: `-32602` (Invalid params)
- Unknown resource: `-32002` (Resource not found)
- Malformed requests: `-32602` (Invalid params)
- Server errors: `-32603` (Internal error)

### Tool Execution Errors

Tool execution errors are returned in tool results with `isError: true`:
- API failures
- Input validation errors
- Business logic errors

**Implementation:**
```typescript
try {
    // Tool execution
} catch (error) {
    if (error instanceof Error && error.message.startsWith('Unknown tool:')) {
        // Protocol error - rethrow
        throw error;
    }
    // Tool execution error - return with isError: true
    return {
        content: [{ type: 'text', text: JSON.stringify(errorInfo, null, 2) }],
        isError: true,
    };
}
```

## Resource Error Handling

**✅ COMPLIANT** - Per [Resources Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/resources#error-handling):

- ✅ Resource not found returns proper error code `-32002`
- ✅ Internal errors return `-32603`
- ✅ Error responses include proper error structure

## Prompt Structure Compliance

**✅ COMPLIANT** - Per [Prompts Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/prompts#data-types):

All prompts include:
- ✅ `name`: Unique identifier
- ✅ `title`: Human-readable name (optional but provided)
- ✅ `description`: Human-readable description
- ✅ `arguments`: List of prompt arguments with descriptions and required flags

**Example:**
```typescript
{
    name: 'create_social_post',
    title: 'Create Social Media Post',
    description: 'Create a social media post design for various platforms',
    arguments: [
        { name: 'platform', description: 'Social media platform', required: true },
        { name: 'message', description: 'The main message', required: false },
    ],
}
```

## Security Compliance

**✅ COMPLIANT** - Per [Security Guidelines](https://spec.modelcontextprotocol.io/#security-and-trust--safety):

### Server Requirements

1. ✅ **Input Validation**: All tool inputs validated using Zod schemas
2. ✅ **Access Controls**: API key authentication required for all operations
3. ✅ **Rate Limiting**: Respects API rate limits from Canvelete platform
4. ✅ **Output Sanitization**: All outputs properly formatted as JSON

### User Consent

- ✅ Tools require explicit API key (user consent)
- ✅ All operations are logged for audit purposes
- ✅ Error messages don't expose sensitive information

## Logging Compliance

**✅ COMPLIANT** - Per [Build Server Guide](https://modelcontextprotocol.io/docs/develop/build-server#logging-in-mcp-servers):

- ✅ All logging uses stderr (never stdout)
- ✅ No `console.log()` calls in production code
- ✅ Custom logger utility writes to `process.stderr`
- ✅ Debug logging only in development mode

## JSON-RPC Compliance

**✅ COMPLIANT** - Per [Base Protocol](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic):

- ✅ All messages follow JSON-RPC 2.0 format
- ✅ Proper request/response structure
- ✅ Error responses follow JSON-RPC error format
- ✅ Stateful connections properly maintained

## Testing with MCP Inspector

**✅ COMPLIANT** - Per [MCP Inspector Guide](https://modelcontextprotocol.io/docs/tools/inspector):

The server can be tested using:
```bash
npx @modelcontextprotocol/inspector canvelete-mcp start
```

This verifies:
- ✅ Server initialization
- ✅ Capability negotiation
- ✅ Tool registration
- ✅ Resource access
- ✅ Prompt availability
- ✅ Error handling

## References

- **[MCP Specification](https://spec.modelcontextprotocol.io/)** - Official protocol specification
- **[Resources Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/resources)** - Resource protocol details
- **[Tools Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/tools)** - Tool protocol details
- **[Prompts Specification](https://spec.modelcontextprotocol.io/specification/2025-11-25/server/prompts)** - Prompt protocol details
- **[Build Server Guide](https://modelcontextprotocol.io/docs/develop/build-server)** - Implementation guide

## Compliance Checklist

- ✅ Resources capability declared with `listChanged`
- ✅ Tools capability declared with `listChanged`
- ✅ Prompts capability declared with `listChanged`
- ✅ Tool names comply with specification (1-128 chars, allowed chars only)
- ✅ Input schemas are valid JSON Schema objects
- ✅ Error handling distinguishes protocol errors from tool execution errors
- ✅ Resource errors use proper error codes
- ✅ Prompts include title, description, and arguments
- ✅ All logging uses stderr
- ✅ Security requirements met (validation, access control, rate limiting)
- ✅ JSON-RPC 2.0 compliance
- ✅ MCP Inspector compatible

