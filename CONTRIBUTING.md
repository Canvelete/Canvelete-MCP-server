# Contributing to Canvelete MCP Server

Thank you for your interest in contributing to the Canvelete MCP Server! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:

1. **Clear title and description** of the bug
2. **Steps to reproduce** the issue
3. **Expected behavior** vs **actual behavior**
4. **Environment details** (Node.js version, OS, etc.)
5. **Error messages** or logs if applicable

### Suggesting Features

Feature suggestions are welcome! Please open an issue with:

1. **Clear description** of the feature
2. **Use case** explaining why it would be useful
3. **Possible implementation** approach (if you have ideas)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the coding standards
4. **Add tests** if applicable
5. **Update documentation** (README, CHANGELOG, etc.)
6. **Commit your changes** with clear messages
7. **Push to your fork** and open a Pull Request

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- A Canvelete API key (for testing)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/your-username/canvelete.git
cd canvelete/mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Run type checking
npm run type-check

# Run tests (if available)
npm test
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow existing code style and patterns
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### Code Structure

- Keep functions focused and single-purpose
- Use async/await for asynchronous operations
- Handle errors appropriately
- Validate input parameters

### Example

```typescript
/**
 * Creates a new design with the specified parameters
 * @param auth - Authenticated user session
 * @param params - Design creation parameters
 * @returns Created design object
 */
async function createDesign(
    auth: AuthSession,
    params: CreateDesignParams
): Promise<Design> {
    // Implementation
}
```

## Testing

### Manual Testing

Test your changes using the MCP Inspector:

```bash
export CANVELETE_API_KEY="your_api_key"
npx @modelcontextprotocol/inspector npx @canveletedotcom/mcp-server start
```

### Testing Checklist

- [ ] All existing tests pass
- [ ] New functionality is tested
- [ ] Error cases are handled
- [ ] Documentation is updated

## Documentation

### README Updates

- Update README.md if you add new features
- Keep examples up to date
- Update installation instructions if needed

### CHANGELOG

- Add entries to CHANGELOG.md for user-facing changes
- Follow the existing format
- Categorize changes (Added, Changed, Fixed, Removed)

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add support for new element type
fix: Resolve API key validation issue
docs: Update installation instructions
refactor: Improve error handling
```

## Review Process

1. All PRs require at least one review
2. Maintainers will review for:
   - Code quality and style
   - Test coverage
   - Documentation completeness
   - Backward compatibility

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Check existing issues and PRs
- Review the documentation

Thank you for contributing! 🎉

