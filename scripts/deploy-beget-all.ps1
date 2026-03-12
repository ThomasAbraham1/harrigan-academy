# deploy-beget-all.ps1
# Builds the project, deletes old JS/CSS from Beget assets/, and uploads fresh files.
# Static files (images, icons) ARE also uploaded to the server.
# Usage: .\scripts\deploy-beget-all.ps1

$ftpUser    = "cta102en"
$ftpPass    = "Thomasabraham@1"
$ftpServer  = "cta1022m.beget.tech"
$remotePath = "cta102en.beget.tech/public_html"
$dist       = "$PSScriptRoot\..\dist"
$ftpBase    = "ftp://$ftpServer/$remotePath"
$creds      = "${ftpUser}:${ftpPass}"

# 1. Build
Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting." -ForegroundColor Red
    exit 1
}

# 2. Delete old JS and CSS from remote assets/
Write-Host ""
Write-Host "Fetching remote assets listing to delete old files..." -ForegroundColor Yellow

$listing = curl.exe -s "$ftpBase/assets/" -u $creds 2>$null

if ($listing) {
    $lines = $listing -split "`n" | Where-Object { $_ -match '\.(js|css)' }
    foreach ($line in $lines) {
        $fileName = ($line.Trim() -split '\s+')[-1].Trim()
        if ($fileName -match '\.(js|css)$') {
            Write-Host "  Deleting $fileName..." -ForegroundColor Yellow
            curl.exe -s "$ftpBase/assets/$fileName" -u $creds -Q "DELE $remotePath/assets/$fileName" 2>$null
            Write-Host "  Deleted: $fileName"
        }
    }
} else {
    Write-Host "  (No listing returned - skipping cleanup)" -ForegroundColor Gray
}

# 3. Upload index.html and other root files
Write-Host ""
Write-Host "Uploading root files..." -ForegroundColor Cyan
$rootFiles = Get-ChildItem "$dist" -File
foreach ($rf in $rootFiles) {
    Write-Host "  Uploading $($rf.Name)..." -ForegroundColor Cyan
    curl.exe -v --retry 5 -T "$($rf.FullName)" "$ftpBase/$($rf.Name)" -u $creds
    Write-Host "  OK: $($rf.Name)"
}

# 4. Upload all assets (JS, CSS, images, icons, etc.)
Write-Host ""
Write-Host "Uploading all files in assets/ (JS, CSS, images, etc.)..." -ForegroundColor Cyan
$assetFiles = Get-ChildItem "$dist\assets" -File -Recurse
if ($assetFiles) {
    # Build the strict path string to properly separate relative paths
    $assetsPath = Join-Path $dist "assets"
    foreach ($f in $assetFiles) {
        $relPath = $f.FullName.Substring($assetsPath.Length + 1).Replace('\', '/')
        Write-Host "  Uploading $relPath..." -ForegroundColor Cyan
        curl.exe -v --retry 5 -T "$($f.FullName)" "$ftpBase/assets/$relPath" --ftp-create-dirs -u $creds
        Write-Host "  OK: assets/$relPath"
    }
}

Write-Host ""
Write-Host "Deploy complete. All files and images were successfully pushed." -ForegroundColor Green
