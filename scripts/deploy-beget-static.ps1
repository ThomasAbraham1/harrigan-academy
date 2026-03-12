# deploy-beget-static.ps1
# Builds the project and uploads ALL static assets (images, icons, .htaccess).
# Unlike deploy-beget.ps1, this script does NOT delete any files on the server.
# It is used for pushing "permanent" assets that don't change every build.

$ftpUser    = "cta102en"
$ftpPass    = "Thomasabraham@1"
$ftpServer  = "cta1022m.beget.tech"
$remotePath = "cta102en.beget.tech/public_html"

# Use Get-Item to resolve the absolute canonical path
$distPath   = (Get-Item "$PSScriptRoot\..\dist").FullName
$assetsPath = (Get-Item "$distPath\assets").FullName

$ftpBase    = "ftp://$ftpServer/$remotePath"
$creds      = "${ftpUser}:${ftpPass}"

# 1. Build
Write-Host "Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Aborting." -ForegroundColor Red
    exit 1
}

# 2. Upload .htaccess
Write-Host ""
Write-Host "Uploading .htaccess..." -ForegroundColor Cyan
if (Test-Path "$distPath\.htaccess") {
    curl.exe --retry 5 -T "$distPath\.htaccess" "$ftpBase/.htaccess" -u $creds
    Write-Host "  OK: .htaccess"
} else {
    Write-Host "  Warning: .htaccess not found in dist/" -ForegroundColor Yellow
}

# 3. Upload all assets recursively (Images, Icons, etc.) - Excluding code files
Write-Host ""
Write-Host "Uploading all static files in assets/ recursively (skipping .js and .css)..." -ForegroundColor Cyan
$assetFiles = Get-ChildItem "$assetsPath" -File -Recurse | Where-Object { 
    $_.Extension -notmatch '\.(js|css)$' 
}

if ($assetFiles) {
    foreach ($f in $assetFiles) {
        # Calculate relative path to preserve folder structure
        # Substring starts after the assets path + the trailing backslash
        $relPath = $f.FullName.Substring($assetsPath.Length + 1).Replace('\', '/')
        Write-Host "  Uploading assets/$relPath..." -ForegroundColor Cyan
        curl.exe --retry 5 -T "$($f.FullName)" "$ftpBase/assets/$relPath" --ftp-create-dirs -u $creds
        Write-Host "  OK: assets/$relPath"
    }
} else {
    Write-Host "  No files found in assets folder." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Deploy of static assets complete. No files were deleted." -ForegroundColor Green
