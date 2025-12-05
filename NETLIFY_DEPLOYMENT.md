# Netlify Deployment Guide

## Overview

This project is configured for deployment on Netlify with the following setup:
- **Frontend**: React + Vite app served as static files
- **Backend**: Netlify serverless functions for Gopher protocol proxy

## Configuration Files

### netlify.toml
The main Netlify configuration file that specifies:
- Build command: `npm ci && npm run build`
- Publish directory: `frontend/dist`
- Functions directory: `netlify/functions`
- Node version: 20
- Redirects for API routes and SPA routing

### Serverless Function
- Location: `netlify/functions/gopher.ts`
- Endpoint: `/.netlify/functions/gopher`
- Accessible via: `/api/gopher` (through redirect)

## Deployment Steps

### 1. Connect Repository to Netlify
1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider and select this repository
4. Netlify will auto-detect the configuration from `netlify.toml`

### 2. Build Settings (Auto-configured)
These are already set in `netlify.toml`:
- **Build command**: `npm ci && npm run build`
- **Publish directory**: `frontend/dist`
- **Functions directory**: `netlify/functions`
- **Node version**: 20

### 3. Environment Variables (Optional)
No environment variables are required for basic deployment. The frontend will use relative API paths (`/api/gopher`) which are redirected to the Netlify function.

### 4. Deploy
- Push to your main branch to trigger automatic deployment
- Or click "Deploy site" in the Netlify dashboard

## Local Development

For local development, continue using the Express server:

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev

# Or run separately
npm run dev:frontend  # Vite dev server on port 5173
npm run dev:backend   # Express server on port 3001
```

## Troubleshooting

### Build Fails with TypeScript Errors
- Ensure `frontend/src/vite-env.d.ts` exists for Vite environment types
- Check that all type imports are correct in `frontend/src/utils/gopherUrl.ts`

### API Requests Fail
- Verify the redirect in `netlify.toml` is correct
- Check Netlify function logs in the dashboard
- Ensure CORS headers are properly set in the function

### Function Timeout
- Netlify functions have a 10-second timeout on free tier
- If Gopher servers are slow, consider caching or upgrading to Pro tier

## Differences from Vercel

This project was originally configured for Vercel (`vercel.json`). Key differences:
- **Vercel**: Uses `@vercel/node` for serverless functions
- **Netlify**: Uses Netlify Functions with esbuild bundler
- Both support the same frontend build process
- API routing is handled differently (Vercel routes vs Netlify redirects)

## Testing the Deployment

After deployment, test the following:
1. Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
2. Try navigating to a Gopher server (e.g., `gopher://gopher.floodgap.com`)
3. Check that menu items are clickable and navigation works
4. Verify bookmarks and history features work

## Support

For Netlify-specific issues, check:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- Build logs in your Netlify dashboard
