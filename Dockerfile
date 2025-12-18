# Canvelete MCP Server - Dockerfile for Cloud Deployment
# Supports both local development and cloud production deployments

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install dependencies - prefer pnpm if lock file exists, otherwise npm
RUN if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && \
      pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run the server
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 mcpuser

# Copy built application from builder
COPY --from=builder --chown=mcpuser:nodejs /app/dist ./dist
COPY --from=builder --chown=mcpuser:nodejs /app/package.json ./package.json

# Install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Switch to non-root user
USER mcpuser

# Expose port (if using HTTP adapter in future)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "process.exit(0)" || exit 1

# Start the MCP server
CMD ["node", "dist/index.cjs", "start"]

# Labels for metadata
LABEL org.opencontainers.image.title="Canvelete MCP Server"
LABEL org.opencontainers.image.description="Model Context Protocol server for Canvelete design platform"
LABEL org.opencontainers.image.version="1.0.4"
LABEL org.opencontainers.image.vendor="Canvelete"
LABEL org.opencontainers.image.licenses="MIT"

