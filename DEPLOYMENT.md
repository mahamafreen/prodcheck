# 📦 Deployment Instructions - Vercel & Railway

## ✅ GitHub Status
- **Repository**: https://github.com/mahamafreen/prodcheck
- **Branch**: `main`
- **Status**: ✅ Code pushed and synced

---

## 🚀 Deploy Frontend to Vercel

### Step 1: Link Project to Vercel
```powershell
cd c:\Users\Elitebook\Desktop\prodcheck-ai
vercel link
```
- Choose: "Link to existing project" (if first time)
- Or: "Create new project" 
- Project name: `prodcheck-ai`
- Framework: `Vite`
- Root: `./`

### Step 2: Add Environment Variables
In Vercel dashboard, go to **Settings → Environment Variables**:

```
VITE_API_URL = https://prodcheck-api.railway.app
```

(Update this after Railway deployment)

### Step 3: Deploy to Production
```powershell
vercel --prod
```

**Expected Output:**
```
✓ Linked to mahamafreen/prodcheck-ai (created .vercel)
✓ Building for production (Build Cache disabled)
✓ Uploaded 87 files (4.5 MB)
✓ Production deployment complete [https://prodcheck-ai.vercel.app]
```

---

## 🚂 Deploy Backend to Railway

### Step 1: Set Up Railway Project
1. Go to https://railway.app/dashboard
2. Click **+ New Project**
3. Select **GitHub Repo** → Select `prodcheck`
4. Choose root directory: `backend`

### Step 2: Configure Environment Variables
In Railway **Variables** tab, add:

| Key | Value |
|-----|-------|
| `GEMINI_API_KEY` | `AIzaSyAPFmnGrb9wTBA3TeEDW9z-iufI7s5UdGg` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://prodcheck-ai.vercel.app` |
| `USE_MOCK` | `false` |

### Step 3: Set Build & Start Commands
In Railway **Deployments** tab:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Environment**: `Node.js`

### Step 4: Deploy
Railway auto-deploys on push. Once complete:
- Backend URL: `https://prodcheck-api.railway.app` (or similar)
- Copy this URL

### Step 5: Update Vercel with Backend URL
1. Go to Vercel dashboard
2. **Settings → Environment Variables**
3. Update: `VITE_API_URL = https://prodcheck-api.railway.app`
4. Redeploy: `vercel --prod`

---

## 🔄 Update Frontend Environment

After Railway deployment, update the API URL:

```powershell
# Update .env.local locally
echo 'VITE_API_URL=https://prodcheck-api.railway.app' > .env.local

# Commit and push
git add .env.local
git commit -m "Update backend API URL for production"
git push origin main
```

Then redeploy to Vercel:
```powershell
vercel --prod
```

---

## 📋 Deployment Checklist

- [ ] GitHub repo created and code pushed
- [ ] Vercel project linked
- [ ] Frontend environment variables set
- [ ] Frontend deployed to Vercel
- [ ] Railway project created
- [ ] Backend environment variables configured
- [ ] Backend deployed to Railway
- [ ] Backend URL copied
- [ ] Vercel updated with backend URL
- [ ] Frontend redeployed with new API URL
- [ ] Test upload on production site
- [ ] Monitor logs for errors

---

## 🧪 Testing Production

1. Open: https://prodcheck-ai.vercel.app
2. Upload a product image
3. Click "Check Authenticity"
4. Verify:
   - ✅ Real-time progress bar appears
   - ✅ Results return from Gemini AI
   - ✅ No console errors (F12)

---

## 📊 Monitoring & Logs

### Vercel Logs
```powershell
vercel logs
```

### Railway Logs
```
In Railway dashboard → Deployments → View Logs
```

---

## 🔒 Security Notes

- ✅ `.env` files are `.gitignore`d (never committed)
- ✅ API key stored in Railway environment variables
- ✅ CORS configured for production domain
- ✅ Frontend uses relative URLs for API calls

---

## 💰 Cost Estimation

| Service | Free Tier | Production |
|---------|-----------|------------|
| **Vercel** | 3 deployments/day | $20/month (optional) |
| **Railway** | $5 credit/month | Pay-as-you-go |
| **Google Gemini** | Free (2000 req/day) | ~$0.075 per 1M tokens |

---

## 🚨 Troubleshooting

### Frontend can't reach backend
```
Error: Cannot connect to backend server
```
**Fix**: 
1. Check Railway deployment is complete
2. Update `VITE_API_URL` in Vercel
3. Redeploy frontend: `vercel --prod`

### CORS errors in browser console
```
Access to XMLHttpRequest blocked by CORS
```
**Fix**: Update `FRONTEND_URL` in Railway to match Vercel deployment URL

### Gemini API errors
```
Error: Invalid API key
```
**Fix**: Verify `GEMINI_API_KEY` in Railway variables matches your actual key

---

## 📚 Reference Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app/dashboard)
- [GitHub Repository](https://github.com/mahamafreen/prodcheck)
- [Gemini API Docs](https://ai.google.dev/)

---

**Deployment Status**: 🟢 Ready for production push
