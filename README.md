# Fulfillment Air Operations Dashboard

Real-time operations, agent KPI performance tracking, GDS Sabre/Amadeus cheatsheets, knowledge base, shift schedules, and department tools for Fulfillment Air.

---

## 🚀 How to Push to GitHub & Make It Live on the Web

The repository already comes pre-configured with **GitHub Actions (`.github/workflows/deploy.yml`)** and automatic base-path resolution in `vite.config.ts`. Once you push your code, GitHub can build and host your live website automatically for free!

### Step 1: Initialize Git and Push to GitHub

If you have Git installed on your computer, open your terminal/command prompt in this project folder:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all files
git add .

# 3. Commit your changes
git commit -m "Initial commit of Fulfillment Air Dashboard"

# 4. Set the main branch
git branch -M main

# 5. Connect your remote GitHub repository
# (Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 6. Push to GitHub
git push -u origin main
```

*(If you already have a remote linked, simply run `git add .`, `git commit -m "Update live dashboard"`, and `git push origin main`)*

---

### Step 2: Enable GitHub Pages (One-Time Setup)

1. Open your repository on GitHub (`https://github.com/YOUR_USERNAME/YOUR_REPO`).
2. Go to **Settings** (top tab of the repository).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** > **Source**, choose **GitHub Actions** (instead of "Deploy from a branch").
5. That's it! GitHub Actions will automatically trigger `.github/workflows/deploy.yml` whenever you push code.
6. Once the workflow completes (usually ~1 minute under the **Actions** tab), your live website will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

---

### Alternative: Deploy to Vercel or Netlify (1-Click)

- **Vercel**: Import your GitHub repo on [vercel.com](https://vercel.com). Framework preset: `Vite`. Root directory: `./`. Click **Deploy**.
- **Netlify**: Connect your GitHub repo on [netlify.com](https://netlify.com). Build command: `npm run build`, Publish directory: `dist`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run dev server on port 3000
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
