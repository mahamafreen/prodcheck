# 🚀 GitHub & Vercel Deployment Guide

## Step 1: Push to GitHub

### Option A: Via GitHub CLI (Fastest)
```powershell
cd c:\Users\Elitebook\Desktop\prodcheck-ai
gh repo create prodcheck-ai --public --source=. --remote=origin --push
```

### Option B: Manual GitHub Setup
1. Go to https://github.com/new
2. Create repo: `prodcheck-ai`
3. Copy the HTTPS URL (e.g., `https://github.com/YOUR-USERNAME/prodcheck-ai.git`)
4. Run in PowerShell:
```powershell
cd c:\Users\Elitebook\Desktop\prodcheck-ai
git remote add origin https://github.com/YOUR-USERNAME/prodcheck-ai.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

### Option A: Vercel CLI (Fastest)
```powershell
npm install -g vercel
cd c:\Users\Elitebook\Desktop\prodcheck-ai
vercel
```
- Select "Vercel" account
- Project name: `prodcheck-ai`
- Framework preset: `Vite`
- Root directory: `./`

### Option B: Vercel Dashboard
1. Go to https://vercel.com/new
2. Connect GitHub repo: `prodcheck-ai`
3. Settings:
   - Framework: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables (add):
   - `VITE_API_URL` = `https://prodcheck-api.railway.app` (backend URL)

## Step 3: Deploy Backend to Railway

### Setup:
1. Go to https://railway.app
2. Create new project → GitHub repo
3. Select `prodcheck-ai` repo
4. Add plugin: PostgreSQL (optional)
5. Deploy from `/backend` directory

### Environment Variables in Railway:
```
GEMINI_API_KEY=AIzaSyAPFmnGrb9wTBA3TeEDW9z-iufI7s5UdGg
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://prodcheck-ai.vercel.app
```

### Get Backend URL:
- Railway generates: `https://prodcheck-api.railway.app`
- Update Vercel: `VITE_API_URL=https://prodcheck-api.railway.app`

## Step 4: Connect Frontend to Backend

After Railway deployment, update Vercel environment:
```
VITE_API_URL=https://prodcheck-api.railway.app
```

Then redeploy Vercel.

## Summary

| Service | URL | Status |
|---------|-----|--------|
| Frontend (Vercel) | https://prodcheck-ai.vercel.app | ⏳ Pending |
| Backend (Railway) | https://prodcheck-api.railway.app | ⏳ Pending |
| GitHub Repo | https://github.com/YOUR-USERNAME/prodcheck-ai | ⏳ Pending |

## Quick Command Reference

```powershell
# Push to GitHub
git remote add origin <github-url>
git push -u origin main

# Deploy to Vercel
vercel --prod

# View logs
vercel logs
railway logs
```

---

**Next Steps:**
1. ✅ Create GitHub repo
2. ✅ Deploy frontend to Vercel
3. ✅ Deploy backend to Railway
4. ✅ Connect services
5. ✅ Test production app
