# Deployment Guide - Harrigan Academy

This guide details how to build and deploy the Harrigan Academy website to Beget hosting.

## 1. Project Overview
- **Framework**: React + Vite
- **Routing**: Single-page with anchor links (e.g., `#about`, `#teachers`).
- **Hosting**: Beget (Apache server).

## 2. Prerequisites
- **Node.js** installed locally.
- **FTP Credentials**:
  - **Host**: `cta1022m.beget.tech`
  - **Username**: `cta102en`
  - **Password**: `Thomasabraham@1`
  - **Remote Path**: `/cta102en.beget.tech/public_html/`

## 3. What Changes on Every Build

> [!IMPORTANT]
> **ONLY these 3 files change** when you edit and rebuild the code:
> - `dist/index.html`
> - `dist/assets/index-XXXXXXXX.js`  ← filename hash changes every build
> - `dist/assets/index-XXXXXXXX.css`  ← filename hash changes every build
>
> **Static files in `dist/assets/images/` and `dist/assets/icons/` DO NOT change** unless you explicitly replace source images in `public/assets/`. These are already uploaded to Beget and must NOT be re-uploaded unless images have changed — it wastes time and risks overwriting correctly placed files.

## 4. Quick Deploy to Beget (Use This Every Time)

```powershell
.\scripts\deploy-beget.ps1
```

The script does the following in order:
1. **Builds** the project (`npm run build`)
2. **Deletes** all old `.js` and `.css` files from the remote `assets/` folder via FTP
3. **Uploads** the 3 new files: `index.html`, new `.js`, new `.css`
4. **Skips** images and icons entirely

> [!IMPORTANT]
> Always use this script instead of uploading manually. Vite generates a new filename hash on every build — if the old files are not deleted first and the new ones don't upload, `index.html` ends up referencing files that don't exist, breaking all CSS and JS on the live site.

## 5. Push to GitHub

```powershell
.\scripts\push-github.ps1
```

Shows changed files, prompts for a commit message, then stages, commits, and pushes to `origin/main`.

## 6. Full Deploy (Images Changed — Rarely Needed)

Only do a full deploy if you have **added or replaced image files** in `public/assets/`. Use the recursive method from the Beget support docs or upload manually via the Beget File Manager at https://sprutio.beget.com/.

## 7. Troubleshooting
- **Blank page or no CSS**: Run `deploy-beget.ps1` again. This usually means index.html was updated but the new JS/CSS didn't finish uploading. The script deletes old files and re-uploads so hashes always match.
- **Old CSS/JS still loading after deploy**: Hard-refresh with `Ctrl+Shift+R`. Vite's hashed filenames bust the CDN cache automatically, but your local browser may still have the old file cached.
- **Not Secure Warning**: SSL needs to be activated in the Beget Control Panel under "SSL Certificates" (Let's Encrypt).
