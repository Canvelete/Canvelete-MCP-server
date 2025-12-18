/**
 * Logger utility for MCP Server
 * 
 * IMPORTANT: For STDIO-based MCP servers, we MUST use stderr for all logging.
 * Writing to stdout will corrupt JSON-RPC messages and break the server.
 * 
 * Reference: https://modelcontextprotocol.io/docs/develop/build-server#logging-in-mcp-servers
 */

/**
 * Log levels
 */
export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

/**
 * Logger configuration
 */
interface LoggerConfig {
    level: LogLevel;
    prefix?: string;
    includeTimestamp?: boolean;
}

class Logger {
    private config: LoggerConfig;

    constructor(config: LoggerConfig = { level: LogLevel.INFO }) {
        this.config = {
            includeTimestamp: true,
            ...config,
        };
    }

    /**
     * Format log message with prefix and timestamp
     */
    private formatMessage(level: string, message: string, ...args: any[]): string {
        const parts: string[] = [];

        if (this.config.includeTimestamp) {
            parts.push(`[${new Date().toISOString()}]`);
        }

        if (this.config.prefix) {
            parts.push(`[${this.config.prefix}]`);
        }

        parts.push(`[${level}]`, message);

        if (args.length > 0) {
            parts.push(JSON.stringify(args, null, 2));
        }

        return parts.join(' ');
    }

    /**
     * Debug log (only in development)
     */
    debug(message: string, ...args: any[]): void {
        if (this.config.level <= LogLevel.DEBUG) {
            // Use stderr - NEVER stdout for STDIO servers
            process.stderr.write(this.formatMessage('DEBUG', message, ...args) + '\n');
        }
    }

    /**
     * Info log
     */
    info(message: string, ...args: any[]): void {
        if (this.config.level <= LogLevel.INFO) {
            // Use stderr - NEVER stdout for STDIO servers
            process.stderr.write(this.formatMessage('INFO', message, ...args) + '\n');
        }
    }

    /**
     * Warning log
     */
    warn(message: string, ...args: any[]): void {
        if (this.config.level <= LogLevel.WARN) {
            // Use stderr - NEVER stdout for STDIO servers
            process.stderr.write(this.formatMessage('WARN', message, ...args) + '\n');
        }
    }

    /**
     * Error log
     */
    error(message: string, error?: unknown, ...args: any[]): void {
        if (this.config.level <= LogLevel.ERROR) {
            const errorInfo = error instanceof Error 
                ? { message: error.message, stack: error.stack }
                : error;
            
            // Use stderr - NEVER stdout for STDIO servers
            process.stderr.write(
                this.formatMessage('ERROR', message, errorInfo, ...args) + '\n'
            );
        }
    }
}

// Create default logger instance
const defaultLogger = new Logger({
    level: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO,
    prefix: 'Canvelete MCP',
});

// Export singleton instance and class
export const logger = defaultLogger;
export { Logger };

/**
 * Create a logger with custom configuration
 */
export function createLogger(config: LoggerConfig): Logger {
    return new Logger(config);
}

