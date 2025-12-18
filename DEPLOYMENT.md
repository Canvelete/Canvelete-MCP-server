# Deployment Guide

This guide covers deploying the Canvelete MCP Server in both local and cloud environments.

**🔗 Related Resources:**
- **[Canvelete Platform](https://canvelete.com)** - Main application
- **[Documentation](https://docs.canvelete.com)** - Full platform documentation
- **[API Documentation](https://docs.canvelete.com/api)** - API reference

## Quick Reference

- **Dockerfile**: Included in repository root
- **Docker Compose**: `docker-compose.yml` for easy local/cloud deployment
- **.dockerignore**: Optimized for faster builds

## Local Deployment

Local deployment is the default mode and works out-of-the-box with MCP clients.

### Quick Start

```bash
# Install globally
npm install -g @canveletedotcom/mcp-server

# Or use npx
npx -y @canveletedotcom/mcp-server start
```

### Configuration

Configure your MCP client (Claude Desktop, Kiro, etc.) to use the local server:

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

## Cloud Deployment

The server can be deployed to various cloud platforms. Here are examples for popular platforms:

### Docker Deployment

Two Dockerfile options are available:

1. **`Dockerfile`** - Multi-stage build from source (recommended for production)
2. **`Dockerfile.simple`** - Simple build using published npm package (faster, smaller)

Both are production-ready and optimized for cloud deployment. 

**Quick Start (Using Published Package):**

```bash
# Build using simple Dockerfile (uses published npm package)
docker build -f Dockerfile.simple -t canvelete-mcp-server .

# Run with environment variables
docker run -e CANVELETE_API_KEY=your_key canvelete-mcp-server
```

**Quick Start (Build from Source):**

```bash
# Build using main Dockerfile (builds from source)
docker build -t canvelete-mcp-server .

# Run with environment variables
docker run -e CANVELETE_API_KEY=your_key canvelete-mcp-server

# Or use docker-compose
docker-compose up -d
```

**Using Docker Compose:**

The repository includes a `docker-compose.yml` file for easy deployment:

```bash
# Set environment variables
export CANVELETE_API_KEY=your_api_key
export CANVELETE_API_URL=https://canvelete.com

# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

**Build Options:**

```bash
# Build for specific platform (e.g., ARM64 for Apple Silicon)
docker build --platform linux/amd64 -t canvelete-mcp-server .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t canvelete-mcp-server .

# Multi-stage build (already optimized in Dockerfile)
docker build --target runner -t canvelete-mcp-server .
```

**Using Published Image (if available):**

```bash
# Pull from registry (if published)
docker pull canvelete/mcp-server:latest

# Run
docker run -e CANVELETE_API_KEY=your_key canvelete/mcp-server:latest
```

**Dockerfile Features:**

**Dockerfile (Source Build):**
- ✅ Multi-stage build for smaller image size
- ✅ Builds from source code
- ✅ Non-root user for security
- ✅ Health checks included
- ✅ Production optimizations
- ✅ Alpine Linux base for minimal footprint

**Dockerfile.simple (NPM Package):**
- ✅ Uses published npm package
- ✅ Faster build times
- ✅ Smaller image size
- ✅ Non-root user for security
- ✅ Health checks included
- ✅ Perfect for production deployments

### Google Cloud Run

**cloud-run.yaml:**
```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: canvelete-mcp-server
spec:
  template:
    spec:
      containers:
      - image: node:18-alpine
        command: ["npx", "-y", "@canveletedotcom/mcp-server", "start"]
        env:
        - name: CANVELETE_API_KEY
          valueFrom:
            secretKeyRef:
              name: canvelete-api-key
              key: api-key
        resources:
          limits:
            cpu: "1"
            memory: "512Mi"
```

**Deploy:**
```bash
gcloud run deploy canvelete-mcp-server \
  --source . \
  --set-env-vars CANVELETE_API_KEY=your_key \
  --region us-central1
```

### Azure Functions

**host.json:**
```json
{
  "version": "2.0",
  "customHandler": {
    "description": {
      "defaultExecutablePath": "node",
      "workingDirectory": "",
      "arguments": [
        "-e",
        "require('child_process').spawn('npx', ['-y', '@canveletedotcom/mcp-server', 'start'], {stdio: 'inherit'})"
      ]
    }
  }
}
```

### AWS Lambda

**handler.js:**
```javascript
const { spawn } = require('child_process');

exports.handler = async (event) => {
  const server = spawn('npx', ['-y', '@canveletedotcom/mcp-server', 'start'], {
    stdio: 'inherit'
  });
  
  // Handle Lambda event and convert to stdio
  // Implementation depends on your Lambda adapter
};
```

### Railway

**railway.json:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npx -y @canveletedotcom/mcp-server start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Vercel/Netlify

For serverless platforms, you'll need to create an HTTP adapter. Create a simple Express server:

**server.js:**
```javascript
import express from 'express';
import { spawn } from 'child_process';

const app = express();
app.use(express.json());

// Spawn MCP server
const mcpServer = spawn('npx', ['-y', '@canveletedotcom/mcp-server', 'start'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// HTTP endpoint that forwards to stdio
app.post('/mcp', async (req, res) => {
  // Forward HTTP request to stdio and return response
  // Implementation depends on your adapter needs
});

export default app;
```

## Environment Variables

All deployment methods support these environment variables:

- `CANVELETE_API_KEY` (required) - Your Canvelete API key
- `CANVELETE_API_URL` (optional) - API URL, defaults to `https://canvelete.com`
- `WS_SERVER_URL` (optional) - WebSocket URL for real-time sync

## Security Considerations

### Local Deployment
- API keys stored in local config files
- Access limited to local machine
- No network exposure

### Cloud Deployment
- Use secret management (Cloud Secrets, AWS Secrets Manager, etc.)
- Enable HTTPS/TLS
- Configure CORS if exposing HTTP endpoints
- Use environment variables, not hardcoded keys
- Implement rate limiting
- Monitor API usage

## Monitoring

### Health Checks

The server logs to stderr. Monitor these logs:

```bash
# Local
canvelete-mcp start 2>&1 | tee mcp-server.log

# Docker
docker logs canvelete-mcp-server

# Cloud Run
gcloud logging read "resource.type=cloud_run_revision"
```

### Metrics to Monitor

- API request rate
- Error rates
- Response times
- API key usage/quota
- Server uptime

## Scaling

### Local
- Single instance per machine
- Limited by local resources

### Cloud
- **Horizontal scaling**: Deploy multiple instances behind a load balancer
- **Vertical scaling**: Increase container resources (CPU/memory)
- **Auto-scaling**: Configure based on request volume

## Troubleshooting

### Connection Issues

**Local:**
- Verify MCP client config file syntax
- Check API key is set correctly
- Ensure Node.js >= 18.0.0

**Cloud:**
- Check container logs
- Verify environment variables are set
- Test API connectivity from container
- Check firewall/security group rules

### Performance Issues

- Increase container resources
- Enable connection pooling
- Cache frequently accessed resources
- Monitor API rate limits

## Best Practices

1. **Use secrets management** for API keys
2. **Enable logging** for debugging
3. **Set up monitoring** and alerts
4. **Use HTTPS** for all external communication
5. **Implement rate limiting** to prevent abuse
6. **Keep dependencies updated**
7. **Use health check endpoints** (if implementing HTTP adapter)
8. **Document your deployment** for your team

## Support

For deployment issues:
- Check [README.md](./README.md) for general setup
- Review [TROUBLESHOOTING.md](./README.md#troubleshooting) section
- **[Platform Documentation](https://docs.canvelete.com)** - Full platform docs
- **[API Documentation](https://docs.canvelete.com/api)** - API reference
- **[Canvelete Platform](https://canvelete.com)** - Main application
- Open an issue on [GitHub](https://github.com/canvelete/canvelete/issues)
- Contact support@canvelete.com

