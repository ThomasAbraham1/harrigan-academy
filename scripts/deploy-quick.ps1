$ftpUser = "cta102en"
$ftpPass = "Thomasabraham@1"
$ftpServer = "cta1022m.beget.tech"
$remotePath = "cta102en.beget.tech/public_html"
$distDir = ".\dist"

Write-Host "🚀 Starting Quick Push (Index, JS, CSS)..."

# 1. Build the project
npm run build

# 2. Upload index.html
Write-Host "Uploading index.html..."
curl.exe -s -T "$distDir\index.html" "ftp://$ftpServer/$remotePath/index.html" -u "${ftpUser}:${ftpPass}"

# 3. Upload built JS and CSS assets (ignores images/icons)
$jsFiles = Get-ChildItem "$distDir\assets\*.js"
$cssFiles = Get-ChildItem "$distDir\assets\*.css"

foreach ($file in $jsFiles) {
    Write-Host "Uploading JS: $($file.Name)..."
    curl.exe -s -T "$file.FullName" "ftp://$ftpServer/$remotePath/assets/$($file.Name)" --ftp-create-dirs -u "${ftpUser}:${ftpPass}"
}

foreach ($file in $cssFiles) {
    Write-Host "Uploading CSS: $($file.Name)..."
    curl.exe -s -T "$file.FullName" "ftp://$ftpServer/$remotePath/assets/$($file.Name)" -u "${ftpUser}:${ftpPass}"
}

Write-Host "✅ Quick push complete! Images were skipped."
