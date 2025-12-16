# Railway Emergency Fix

If Railway is still showing 502 errors, do this:

1. Go to https://railway.app/dashboard
2. Click **prodcheck-production** → **Variables**
3. Add/Update: `USE_MOCK` = `true`
4. Save - Railway auto-redeploys
5. Wait 2-3 minutes for green checkmark
6. Test app: https://prodcheck-et1151j6l-afreenmaham72-2939s-projects.vercel.app

This will make the backend return mock AI responses while the real deployment stabilizes.

Once working, you can change `USE_MOCK` back to `false` for real Gemini API responses.
