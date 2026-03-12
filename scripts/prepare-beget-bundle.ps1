# prepare-beget-bundle.ps1
# Automates the build and bundling of the Harrigan Academy project into a single ZIP for Beget.

$projectName = "harrigan_academy_full_deploy"
$zipPath = "$PSScriptRoot\..\${projectName}.zip"
$distPath = "$PSScriptRoot\..\dist"

# 1. Clean up old ZIP if exists
if (Test-Path $zipPath) {
    Write-Host "Removing old ZIP: ${projectName}.zip" -ForegroundColor Yellow
    Remove-Item $zipPath
}

# 2. Build the project
Write-Host "Running build (npm run build)..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Aborting." -ForegroundColor Red
    exit 1
}

# 3. Verify dist folder
if (-not (Test-Path $distPath)) {
    Write-Host "Error: dist folder not found after build!" -ForegroundColor Red
    exit 1
}

# 4. Create ZIP
Write-Host "Creating deployment bundle: ${projectName}.zip..." -ForegroundColor Green
Compress-Archive -Path "${distPath}\*" -DestinationPath $zipPath -Force

if (Test-Path $zipPath) {
    $size = (Get-Item $zipPath).Length / 1MB
    Write-Host "Success! ZIP created at: $zipPath" -ForegroundColor Green
    Write-Host "Total Size: $([Math]::Round($size, 2)) MB" -ForegroundColor Gray
    Write-Host "`nReady for upload to Beget File Manager." -ForegroundColor White
} else {
    Write-Host "Error: Failed to create ZIP file." -ForegroundColor Red
    exit 1
}
