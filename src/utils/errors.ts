// Custom error classes for MCP server
export class MCPError extends Error {
    constructor(
        message: string,
        public code: string = 'INTERNAL_ERROR',
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'MCPError';
    }
}

export class AuthenticationError extends MCPError {
    constructor(message: string = 'Authentication failed') {
        super(message, 'AUTHENTICATION_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}

export class PermissionError extends MCPError {
    constructor(message: string = 'Permission denied') {
        super(message, 'PERMISSION_ERROR', 403);
        this.name = 'PermissionError';
    }
}

export class NotFoundError extends MCPError {
    constructor(resource: string) {
        super(`${resource} not found`, 'NOT_FOUND', 404);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends MCPError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}

export class RateLimitError extends MCPError {
    constructor(message: string = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_ERROR', 429);
        this.name = 'RateLimitError';
    }
}

/**
 * Format error for MCP response
 */
export function formatError(error: unknown): { code: string; message: string } {
    if (error instanceof MCPError) {
        return {
            code: error.code,
            message: error.message,
        };
    }

    if (error instanceof Error) {
        return {
            code: 'INTERNAL_ERROR',
            message: error.message,
        };
    }

    return {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
    };
}

/**
 * Log error with context
 */
export function logError(error: unknown, context?: Record<string, any>): void {
    console.error('[MCP Server Error]', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        ...context,
    });
}
