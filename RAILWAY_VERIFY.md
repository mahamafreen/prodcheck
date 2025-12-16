# ⚠️ Railway Configuration Checklist

**DO THIS NOW in Railway Dashboard:**

1. Go to https://railway.app/dashboard
2. Select **prodcheck-production** project
3. Click **Variables** tab
4. Verify these environment variables are set:

| Variable | Value | Status |
|----------|-------|--------|
| `GEMINI_API_KEY` | `AIzaSyAPFmnGrb9wTBA3TeEDW9z-iufI7s5UdGg` | ✅ Required |
| `PORT` | `5000` | ✅ Required |
| `NODE_ENV` | `production` | ✅ Required |
| `FRONTEND_URL` | `https://prodcheck-et1151j6l-afreenmaham72-2939s-projects.vercel.app` | ✅ Required |
| `USE_MOCK` | `false` | ✅ Optional |

**If any are missing, add them!**

5. After updating, Railway will auto-redeploy (watch the Deployments tab)
6. Once deployed (green checkmark), go back to Vercel and test

---

## Verify Deployment

After Railway redeploys:

1. Open: https://railway.app → prodcheck-production → Deployments
2. Look for **latest deployment** with green ✅ status
3. Click it to see logs and verify it started correctly

Expected log output:
```
🚀 Backend server running on http://0.0.0.0:5000
📡 CORS enabled for: https://prodcheck-et1151j6l-afreenmaham72-2939s-projects.vercel.app
```

---

## Then Test Frontend

Once Railway is confirmed running:

1. Go to: https://prodcheck-et1151j6l-afreenmaham72-2939s-projects.vercel.app
2. Upload a product image
3. Click "Check Authenticity"
4. **Should work now!** ✅

If not, check browser console (F12) for specific errors.
