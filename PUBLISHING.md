# Publishing Guide for @canveletedotcom/mcp-server

This guide walks you through publishing the package to npm.

## Prerequisites

1. **npm Account**: You need an npm account. Create one at https://www.npmjs.com/signup
2. **Organization Access**: You need publish access to the `@canveletedotcom` organization on npm
3. **Two-Factor Authentication**: Recommended for security

## Step 1: Login to npm

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

Verify you're logged in:
```bash
npm whoami
```

## Step 2: Verify Package Configuration

The package is already configured with:
- ✅ Proper `files` field to include only necessary files
- ✅ `prepublishOnly` script to build before publishing
- ✅ Binary executable (`canvelete-mcp`)
- ✅ MIT License
- ✅ Repository and homepage links
- ✅ Comprehensive keywords

## Step 3: Test the Package Locally

Before publishing, test the package locally:

```bash
# Build the package
npm run build

# Test the CLI
node dist/index.cjs start

# Or test with the binary name
./dist/index.cjs start
```

## Step 4: Version Management

Update the version before publishing (if needed):

```bash
# Patch version (1.0.1 -> 1.0.2)
npm version patch

# Minor version (1.0.1 -> 1.1.0)
npm version minor

# Major version (1.0.1 -> 2.0.0)
npm version major
```

This will:
- Update `package.json`
- Create a git commit
- Create a git tag

## Step 5: Publish to npm

### Dry Run (Recommended First)

See what will be published without actually publishing:

```bash
npm publish --dry-run
```

### Publish for Real

For scoped packages like `@canveletedotcom/mcp-server`, you need to specify access:

```bash
# Public package (free)
npm publish --access public

# Or private package (requires paid plan)
npm publish --access restricted
```

## Step 6: Verify Publication

After publishing:

1. Check the package page: https://www.npmjs.com/package/@canveletedotcom/mcp-server
2. Test installation:
   ```bash
   # In a different directory
   npm install -g @canveletedotcom/mcp-server
   canvelete-mcp --version
   ```

## Step 7: Tag the Release (Optional but Recommended)

```bash
git tag v1.0.1
git push origin v1.0.1
```

## Troubleshooting

### "You do not have permission to publish"

You need to be added as a maintainer of the `@canveletedotcom` organization:
1. Organization owner needs to add you at: https://www.npmjs.com/settings/canveletedotcom/members
2. Or create the organization if it doesn't exist

### "Package name too similar to existing package"

If the organization doesn't exist, you might need to:
1. Create the organization on npm
2. Or use a different package name

### "Version already exists"

You need to bump the version:
```bash
npm version patch
npm publish --access public
```

## Quick Publish Checklist

- [ ] Logged into npm (`npm whoami`)
- [ ] Tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Version updated (`npm version patch/minor/major`)
- [ ] Dry run looks good (`npm publish --dry-run`)
- [ ] Published (`npm publish --access public`)
- [ ] Verified on npmjs.com
- [ ] Tested installation globally
- [ ] Git tag created and pushed

## Continuous Publishing

For future releases:

```bash
# 1. Make your changes
# 2. Commit changes
git add .
git commit -m "feat: add new feature"

# 3. Bump version (this creates a commit and tag)
npm version patch -m "chore: bump version to %s"

# 4. Build and publish (prepublishOnly will run automatically)
npm publish --access public

# 5. Push to git
git push && git push --tags
```

## Automated Publishing with GitHub Actions (Optional)

You can automate publishing with GitHub Actions. Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm test
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then add your npm token to GitHub Secrets:
1. Generate token at https://www.npmjs.com/settings/[username]/tokens
2. Add to GitHub repo secrets as `NPM_TOKEN`

## Support

For issues:
- npm documentation: https://docs.npmjs.com/
- Package issues: https://github.com/canvelete/canvelete/issues
