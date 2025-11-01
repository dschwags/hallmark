# Cloudflare Pages Deployment Instructions

## Current Issue
The site at https://hallmark25.pages.dev/ is showing a VitePress 404 page instead of our React app.

## Solution: Correct Cloudflare Pages Settings

### 1. Go to Cloudflare Pages Dashboard
- Visit: https://dash.cloudflare.com/
- Navigate to: Workers & Pages > hallmark25

### 2. Check Current Settings
Go to **Settings** > **Builds & deployments**

### 3. Update Build Configuration

#### Build Settings (REQUIRED):
```
Framework preset: None (or Vite)
Build command: npm run build
Build output directory: dist
Root directory: / (leave empty or use /)
```

#### Environment Variables (if needed):
```
NODE_VERSION: 18
```

### 4. Clear Old Deployments
- Go to **Deployments** tab
- Look for the most recent deployment
- Click the three dots (...) and select "Retry deployment"
- OR trigger a new deployment by making a small commit

### 5. Verify Files After Build
After deployment completes, these files should exist:
- `/index.html` - Main app entry point
- `/assets/index-[hash].js` - React bundle
- `/_redirects` - SPA routing rules
- `/_headers` - Security headers

## Test URLs
After successful deployment:
- Main app: https://hallmark25.pages.dev/
- Test page: https://hallmark25.pages.dev/test.html

## Manual Deployment (Alternative)
If automatic deployment isn't working:

```bash
# Build locally
npm install
npm run build

# Deploy using Wrangler
npx wrangler pages deploy dist --project-name=hallmark25
```

## Troubleshooting

### If you still see VitePress 404:
1. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check deployment logs** in Cloudflare dashboard
3. **Verify the correct branch** is being deployed (should be `main`)
4. **Delete the project** in Cloudflare and reconnect to GitHub

### Check Build Logs
Look for these in the deployment logs:
```
✓ 1249 modules transformed.
dist/index.html
dist/assets/index-[hash].js
```

### Common Issues:
- **Wrong branch**: Ensure "main" branch is selected
- **Wrong directory**: Build output should be "dist" not "dist/"
- **Old cache**: Cloudflare might be caching old deployments
- **Build command**: Must be exactly "npm run build"

## Repository Information
- GitHub: https://github.com/dschwags/hallmark
- Branch: main
- Latest commit includes: React app with proper build configuration
