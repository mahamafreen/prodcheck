# Railway Backend Deployment

1. Go to https://railway.app
2. Click **+ New Project**
3. Select **GitHub Repo**
4. Choose `prodcheck` repository
5. Click **Deploy**
6. Select root directory: `/backend`
7. Add these environment variables:

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | `AIzaSyAPFmnGrb9wTBA3TeEDW9z-iufI7s5UdGg` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://prodcheck-ai.vercel.app` |

8. Wait for deployment to complete (~2-3 minutes)
9. Copy your backend URL from Railway dashboard (e.g., `https://prodcheck-backend.railway.app`)
10. Use that URL as your `VITE_API_URL` in Vercel

**Then return here and we'll complete the Vercel deployment.**
