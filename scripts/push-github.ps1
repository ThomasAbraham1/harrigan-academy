# push-github.ps1
# Stages all changes, prompts for a commit message, and pushes to GitHub.
# Usage: .\scripts\push-github.ps1

$status = git status --short
if (-not $status) {
    Write-Host "Nothing to commit - working tree clean." -ForegroundColor Green
    exit 0
}

Write-Host "Changed files:" -ForegroundColor Cyan
git status --short

Write-Host ""
$msg = Read-Host "Enter commit message"

if (-not $msg -or $msg.Trim() -eq "") {
    Write-Host "Error: Commit message cannot be empty. Aborting." -ForegroundColor Red
    exit 1
}

git add -A
git commit -m $msg
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to GitHub." -ForegroundColor Green
} else {
    Write-Host "Error: Push failed." -ForegroundColor Red
}
