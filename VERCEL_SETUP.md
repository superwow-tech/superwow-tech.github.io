# Vercel Deployment Setup

This project is now configured to deploy on Vercel, which allows you to use **nodemailer** with API routes.

## 🚀 Deploy to Vercel

### Option 1: Deploy via GitHub Integration (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add your environment variables (see below)
6. Click **"Deploy"**

That's it! Vercel will automatically deploy on every push to your main branch.

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## 🔐 Environment Variables

Add these in **Vercel Dashboard → Your Project → Settings → Environment Variables**:

### For Gmail (Default):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**SMTP_USER** = Your Gmail address (e.g., `john@gmail.com`)  
**SMTP_PASS** = Gmail App Password (NOT your regular password)

**Steps for Gmail:**
1. Enable 2-Step Verification on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use the App Password as `SMTP_PASS`

---

### For Other Email Providers:

#### Outlook/Office 365:
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### Yahoo:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

#### Custom SMTP Server:
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

**Note:** If you don't set `SMTP_HOST`, it defaults to `smtp.gmail.com`

## 🌐 Domain Configuration

### Option A: Use Vercel's Default Domain
- After deployment, you'll get: `your-project.vercel.app`
- This is free and works immediately

### Option B: Use Your GitHub Pages Domain
To use `superwow-tech.github.io` with Vercel:

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add custom domain: `superwow-tech.github.io`

2. **In GitHub:**
   - Go to your repository → Settings → Pages
   - Disable GitHub Pages (or keep it disabled)
   - The domain will now point to Vercel

3. **DNS Configuration:**
   - Vercel will provide DNS records to add
   - Add a CNAME record pointing `superwow-tech.github.io` to Vercel's servers

### Option C: Use Your Own Custom Domain
- Add your domain in Vercel → Settings → Domains
- Follow Vercel's DNS instructions

## ✅ Benefits of Vercel

- ✅ **API Routes work** - nodemailer will function perfectly
- ✅ **Automatic deployments** from GitHub
- ✅ **Free tier** with generous limits
- ✅ **Fast CDN** and global edge network
- ✅ **Preview deployments** for every PR
- ✅ **Zero configuration** needed for Next.js

## 📧 Testing the Contact Form

After deployment, test your contact form:
1. Fill out the form on your Vercel site
2. Check your email for the notification
3. The sender should receive an auto-reply

## 🔄 Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every PR → Preview deployment (with unique URL)

No manual deployment needed!

