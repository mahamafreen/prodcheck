# 🎯 QUICK DEPLOYMENT STEPS

## 1️⃣ Deploy Frontend to Vercel (2 minutes)

### Via Vercel Dashboard (Easiest)
1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Enter: `mahamafreen/prodcheck`
4. Framework: `Vite`
5. Click **Deploy**

### Via Vercel CLI
```powershell
cd c:\Users\Elitebook\Desktop\prodcheck-ai
vercel --prod
```

**Your Frontend URL**: https://prodcheck-ai.vercel.app (or similar)

---

## 2️⃣ Deploy Backend to Railway (3 minutes)

1. Go to: https://railway.app
2. Click **+ New Project** → **Deploy from GitHub**
3. Select repo: `prodcheck`
4. Select root directory: `/backend`
5. Add environment variables:

```
GEMINI_API_KEY=AIzaSyAPFmnGrb9wTBA3TeEDW9z-iufI7s5UdGg
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://prodcheck-ai.vercel.app
USE_MOCK=false
```

6. Click **Deploy**

**Your Backend URL**: https://prodcheck-api.railway.app (or check dashboard)

---

## 3️⃣ Connect Frontend to Backend (1 minute)

1. Go to Vercel Dashboard → Project → **Settings**
2. Click **Environment Variables**
3. Add/Update:
   ```
   VITE_API_URL = https://prodcheck-api.railway.app
   ```
4. Redeploy: `vercel --prod`

---

## ✅ Test Production

Open: **https://prodcheck-ai.vercel.app**

1. Upload product image
2. Click "Check Authenticity"
3. See real-time progress bar
4. Get AI results

---

## 📊 Status Board

```
┌─────────────────────────────────────────┐
│     PRODCHECK AI DEPLOYMENT STATUS      │
├─────────────────────────────────────────┤
│ GitHub:  ✅ https://github.com/mahamafreen/prodcheck
│ Frontend: ⏳ https://prodcheck-ai.vercel.app
│ Backend:  ⏳ https://prodcheck-api.railway.app
│ Database: N/A (Stateless)
│ Cache:    N/A (CDN via Vercel)
└─────────────────────────────────────────┘
```

---

## 🔗 Links

- [GitHub Repo](https://github.com/mahamafreen/prodcheck)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app/dashboard)

---

**Status**: Ready to deploy! Follow the 3 steps above. ✅
