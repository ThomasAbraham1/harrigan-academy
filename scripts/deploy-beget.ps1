# deploy-beget.ps1
# Builds the project, deletes old JS/CSS from Beget assets/, uploads fresh ones.
# Static files (images, icons) are NOT touched.
# Usage: .\scripts\deploy-beget.ps1

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

# 3. Upload index.html
Write-Host ""
Write-Host "Uploading index.html..." -ForegroundColor Cyan
curl.exe -s -T "$dist\index.html" "$ftpBase/index.html" -u $creds
Write-Host "  OK: index.html"

# 4. Upload new JS and CSS
$codeFiles = Get-ChildItem "$dist\assets" -File | Where-Object { $_.Extension -eq ".js" -or $_.Extension -eq ".css" }
foreach ($f in $codeFiles) {
    Write-Host "  Uploading $($f.Name)..." -ForegroundColor Cyan
    curl.exe -s -T "$($f.FullName)" "$ftpBase/assets/$($f.Name)" --ftp-create-dirs -u $creds
    Write-Host "  OK: $($f.Name)"
}

Write-Host ""
Write-Host "Deploy complete. Images were NOT touched." -ForegroundColor Green
