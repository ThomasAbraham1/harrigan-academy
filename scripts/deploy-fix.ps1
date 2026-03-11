$ftpUser = "cta102en"
$ftpPass = "Thomasabraham@1"
$ftpServer = "cta1022m.beget.tech"
$remotePath = "cta102en.beget.tech/public_html"
$distDir = "d:\Harrigan Academy Site\harrigan-academy\dist"

Write-Host "🚀 Starting Deployment Fix..."

# 1. Build the project (ensures latest relative paths from vite.config.js)
npm run build

# 2. Upload root files (index.html, etc)
Write-Host "Uploading root files..."
curl.exe -s -T "$distDir\index.html" "ftp://$ftpServer/$remotePath/index.html" -u "${ftpUser}:${ftpPass}"
if (Test-Path "$distDir\.htaccess") { curl.exe -s -T "$distDir\.htaccess" "ftp://$ftpServer/$remotePath/.htaccess" -u "${ftpUser}:${ftpPass}" }
if (Test-Path "$distDir\vite.svg") { curl.exe -s -T "$distDir\vite.svg" "ftp://$ftpServer/$remotePath/vite.svg" -u "${ftpUser}:${ftpPass}" }

# 3. Upload assets (JS, CSS, Images, etc)
# We use Get-ChildItem to find all files recursively in dist\assets
$allAssets = Get-ChildItem "$distDir\assets" -Recurse -File
$total = $allAssets.Count
$idx = 0

foreach ($file in $allAssets) {
    $idx++
    # Get the path relative to the 'dist' folder (e.g., 'assets/js/main.js')
    $relPath = $file.FullName.Substring($distDir.Length + 1).Replace("\", "/")
    Write-Host "[$idx/$total] Uploading $relPath..."
    
    # We upload directly to $remotePath/$relPath. 
    # This avoids the "assets/assets/" doubling bug.
    curl.exe -s -T "$($file.FullName)" "ftp://$ftpServer/$remotePath/$relPath" --ftp-create-dirs -u "${ftpUser}:${ftpPass}"
}

Write-Host "✅ Deployment Fix Complete!"
