# Deployment

## Overview

WFHroulette can be deployed as:

1. **npm package** - Command-line tool for developers
2. **Web application** - Static site with Node.js server
3. **Vercel** - Serverless deployment (pre-configured)

## Local Development

```bash
# Install dependencies
npm install

# Run CLI
npm start

# Run web server
npm run web
# Open http://localhost:4173/web/

# Run tests before deploying
npm test
```

## Deploying as npm Package

### Prerequisites

- npm account
- Bump version in `package.json`
- Update `CHANGELOG.md`

### Publishing to npm

```bash
# Verify all tests pass
npm test

# Log in to npm
npm login

# Publish
npm publish

# Link locally for testing
npm link

# Unlink when done
npm unlink -g wfhroulette
```

### Using Published Package

Users can install globally:

```bash
npm install -g wfhroulette
wfhroulette --seed my-team --date 2025-09-25
```

## Deploying Web Application

### Prerequisites

- Node.js 20+
- Port 4173 available (configurable via `PORT` env var)

### Local Deployment

```bash
npm install
npm run web
```

Server runs on `http://localhost:4173`

### Production Environment Variables

```bash
PORT=3000              # Server port (default: 4173)
NODE_ENV=production    # Set to 'production' for optimizations
```

### Starting Server in Production

```bash
# Standard start
PORT=3000 npm run web

# Using node directly
PORT=3000 node web/server.js

# Using process manager (PM2)
pm2 start web/server.js --name wfhroulette --env "PORT=3000"
```

## Deploying to Vercel

WFHroulette is pre-configured for Vercel deployment.

### Prerequisites

- Vercel account
- Project connected to GitHub

### One-Click Deployment

Option 1: Deploy from GitHub

```bash
# Push to GitHub, then visit:
# https://vercel.com/new and select the WFHroulette repository
```

Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Vercel Configuration

Configuration is in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run web",
  "outputDirectory": "web"
}
```

### Custom Domain Setup

1. Add custom domain in Vercel dashboard
2. Update DNS records (instructions provided by Vercel)
3. Verify CNAME records point to Vercel
4. Update meta tags in `web/index.html`:

```html
<link rel="canonical" href="https://your-domain.com/web/" />
<meta property="og:url" content="https://your-domain.com/web/" />
<meta property="og:image" content="https://your-domain.com/web/og-image.png" />
```

5. Redeploy after URL changes

### Environment Variables (Vercel)

1. Go to Project Settings → Environment Variables
2. Add any needed variables (none required for basic deployment)
3. Redeploy to apply changes

## Deploying to Other Platforms

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "web/server.js"]
```

Build and run:

```bash
docker build -t wfhroulette .
docker run -p 3000:3000 wfhroulette
```

### Heroku

```bash
heroku create wfhroulette
heroku config:set PORT=8080
git push heroku main
```

### AWS, DigitalOcean, Fly.io

All support Node.js applications. Basic steps:

1. Push code to repository
2. Connect repository to hosting platform
3. Ensure `npm install` and `npm run web` work locally
4. Platform handles deployment automatically

## Pre-Deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] No security warnings: `npm audit`
- [ ] Code style correct: `npm run lint` (if applicable)
- [ ] CHANGELOG.md updated with version and changes
- [ ] Package version bumped in `package.json`
- [ ] README.md URLs are correct
- [ ] Web app meta tags updated (canonical, og:url, etc.)
- [ ] Commit message is clear: `git commit -m "version X.X.X"`

## Post-Deployment Verification

### For Web App

1. Visit the deployed URL
2. Test form submission with different seeds
3. Verify reasons load correctly
4. Check browser console for errors
5. Verify meta tags in page source:
   ```html
   <link rel="canonical" href="https://your-domain/web/" />
   <meta property="og:url" content="https://your-domain/web/" />
   ```

### For CLI Package

1. Install: `npm install -g wfhroulette`
2. Test: `wfhroulette --help`
3. Test with seed: `wfhroulette --seed test-team`
4. Verify output is correct

### For Both

1. Run production tests: `npm test`
2. Check error logs
3. Monitor performance if possible

## Rollback Procedures

### npm Package

```bash
npm unpublish wfhroulette@X.X.X
# Or republish previous version
npm publish --tag latest
```

### Vercel

1. Go to Vercel dashboard
2. Select project
3. Go to Deployments
4. Click three dots on previous stable version
5. Select "Promote to Production"

### Self-Hosted

1. Restart previous version:
   ```bash
   git checkout previous-version-tag
   npm install
   npm run web
   ```

## Performance Optimization

### Web App

- Static files are cached efficiently
- No external dependencies = fast load
- Client-side computation only
- Small bundle size

### CLI

- Zero startup overhead
- Immediate execution
- No network calls

## Monitoring & Logging

### Local Development

Check console output for errors:

```bash
npm run web
# Look for "Server listening on" message
```

### Production (Vercel)

1. Vercel dashboard shows deployment status
2. Check function logs for errors
3. Monitor response times

### Self-Hosted

```bash
# Run with logging
node web/server.js 2>&1 | tee server.log

# Or use PM2 with monitoring
pm2 start web/server.js --name wfhroulette
pm2 logs wfhroulette
```

## Troubleshooting Deployment

### Port Already in Use

```bash
# Change port
PORT=3001 npm run web

# Or kill existing process
kill -9 $(lsof -t -i :4173)
```

### Module Import Errors

- Verify `.js` file extensions in imports
- Check `package.json` has `"type": "module"`
- Ensure `node_modules` is up to date

### Static Files Not Found

- Verify files exist: `ls -la web/`
- Check `web/server.js` path handling
- Ensure relative paths are correct

### Tests Fail in CI

- Use Node.js 18+ (check `.nvmrc`)
- Install exact versions: `npm ci` instead of `npm install`
- Set `SKIP_INTEGRATION_TESTS=true` in sandboxes

---

For more information, see [ARCHITECTURE.md](ARCHITECTURE.md) and [TESTING.md](TESTING.md).

> **BuildProven LLC** · [buildproven.ai](https://buildproven.ai)
