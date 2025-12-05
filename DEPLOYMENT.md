# Deployment Guide - Gopher Browser

This guide covers deploying the Gopher Browser to various platforms.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel can host both the frontend and backend in one deployment.

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Link to existing project or create new
# - Confirm settings
# - Deploy!
```

**Configuration:**
- The `vercel.json` file is already configured
- Backend runs as serverless functions
- Frontend is served as static files
- No environment variables needed for basic deployment

**After Deployment:**
- You'll get a URL like: `https://gopher-browser-xyz.vercel.app`
- Test it with: `gopher://gopher.floodgap.com`

### Option 2: Railway (Backend) + Netlify (Frontend)

**Backend on Railway:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Deploy
railway up

# Get your backend URL
railway domain
```

**Frontend on Netlify:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build frontend
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variable
netlify env:set VITE_API_URL https://your-railway-backend.railway.app/api
```

### Option 3: Render (Full Stack)

**Backend:**
1. Go to https://render.com
2. Create new "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node

**Frontend:**
1. Create new "Static Site"
2. Connect same GitHub repo
3. Settings:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variable: `VITE_API_URL` = your backend URL

## Environment Variables

### Backend

```bash
PORT=3001                    # Port to run on (optional, defaults to 3001)
NODE_ENV=production          # Set to production for deployment
```

### Frontend

```bash
VITE_API_URL=https://your-backend-url.com/api
```

## Manual Deployment

### Backend (Node.js Server)

```bash
# Build
cd backend
npm install
npm run build

# Run
npm start
```

**Requirements:**
- Node.js 18+
- Port 3001 (or set PORT env var)

**Deploy to:**
- Railway
- Render
- Heroku
- DigitalOcean App Platform
- AWS EC2
- Any Node.js hosting

### Frontend (Static Files)

```bash
# Build
cd frontend
npm install
npm run build

# Output is in: frontend/dist/
```

**Deploy to:**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting

## Docker Deployment

### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://localhost:3001/api
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

## Post-Deployment Checklist

- [ ] Test basic navigation: `gopher://gopher.floodgap.com`
- [ ] Test bookmarking a page
- [ ] Test history navigation
- [ ] Test search functionality (find a type 7 item)
- [ ] Test PWA installation (mobile)
- [ ] Test offline functionality
- [ ] Verify error handling (try invalid URL)
- [ ] Check responsive design (mobile/tablet)

## Troubleshooting

### Backend Issues

**Problem:** Connection timeout errors
- **Solution:** Check firewall rules, ensure port 3001 is open
- **Solution:** Verify Gopher servers are accessible from your host

**Problem:** CORS errors
- **Solution:** Ensure CORS is enabled in backend
- **Solution:** Check VITE_API_URL matches your backend URL

### Frontend Issues

**Problem:** API calls failing
- **Solution:** Verify VITE_API_URL is set correctly
- **Solution:** Check backend is running and accessible

**Problem:** PWA not installing
- **Solution:** Ensure HTTPS is enabled (required for PWA)
- **Solution:** Check service worker registration

### Performance Issues

**Problem:** Slow Gopher connections
- **Solution:** Some Gopher servers are slow - this is normal
- **Solution:** Implement connection timeout (already set to 10s)

## Monitoring

### Backend Logs

```bash
# Railway
railway logs

# Render
# View in dashboard

# Docker
docker logs gopher-browser-backend
```

### Frontend Analytics

Consider adding:
- Google Analytics
- Plausible Analytics
- Vercel Analytics (if using Vercel)

## Scaling

The application is stateless and can scale horizontally:

- **Backend:** Add more instances behind a load balancer
- **Frontend:** Served from CDN, scales automatically
- **Database:** None required (uses localStorage)

## Security

- ✅ Input validation on all Gopher URLs
- ✅ XSS prevention (React escapes by default)
- ✅ CORS configured properly
- ✅ No sensitive data stored
- ✅ HTTPS enforced (for PWA)

## Cost Estimates

**Free Tier Options:**
- Vercel: Free for hobby projects
- Netlify: Free for personal projects
- Railway: $5/month credit (enough for small projects)
- Render: Free tier available

**Estimated Monthly Cost:** $0-5 for low traffic

## Support

For deployment issues:
1. Check the logs
2. Verify environment variables
3. Test locally first
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**
