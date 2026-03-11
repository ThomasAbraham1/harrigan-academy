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

## 4. Quick Deploy (Code Only — Use This Every Time)

After making code changes, run this script. It builds the project and uploads **only the 3 changed files**, skipping images and icons entirely:

```powershell
# Run from: d:\Harrigan Academy Site\harrigan-academy\
powershell.exe -ExecutionPolicy Bypass -File "scripts\deploy-quick.ps1"
```

Or manually:

```powershell
$ftpUser = "cta102en"
$ftpPass = "Thomasabraham@1"
$ftpServer = "cta1022m.beget.tech"
$remoteRoot = "cta102en.beget.tech/public_html"
$dist = ".\dist"

npm run build

# Upload index.html
curl.exe -s -T "$dist\index.html" "ftp://$ftpServer/$remoteRoot/index.html" -u "${ftpUser}:${ftpPass}"

# Upload JS and CSS only (NOT images or icons)
Get-ChildItem "$dist\assets" -File | Where-Object { $_.Extension -eq ".js" -or $_.Extension -eq ".css" } | ForEach-Object {
    curl.exe -s -T "$($_.FullName)" "ftp://$ftpServer/$remoteRoot/assets/$($_.Name)" --ftp-create-dirs -u "${ftpUser}:${ftpPass}"
}
```

## 5. Full Deploy (Images Changed — Rarely Needed)

Only do a full deploy if you have **added or replaced image files** in `public/assets/`. Use the recursive method from the Beget support docs or upload manually via the Beget File Manager at https://sprutio.beget.com/.

## 6. Troubleshooting
- **Blank page**: Make sure `vite.config.js` has `base: './'`. Without this, asset paths use `/` (absolute) which breaks on Beget's subfolder structure.
- **Old CSS/JS still loading**: The browser cached the old file. Hard-refresh with `Ctrl+Shift+R`. The new filenames (with hash) force cache-busting automatically.
- **Not Secure Warning**: SSL needs to be activated in the Beget Control Panel under "SSL Certificates" (Let's Encrypt).
