# push-github.ps1
# Stages all changes, prompts for a commit message, and pushes to GitHub.
# Usage: .\scripts\push-github.ps1

# Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Check if it's a git repository
$isGitRepo = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0 -or $isGitRepo -ne "true") {
    Write-Host "[!] Current directory is not a git repository." -ForegroundColor Red
    exit 1
}

# Get current branch name
$branch = git rev-parse --abbrev-ref HEAD
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Could not determine current branch." -ForegroundColor Red
    exit 1
}

# Check for changes
$status = git status --short
if (-not $status) {
    # Still check if we have commits to push
    # Quote "@{u}" to avoid PowerShell interpretation as a hash table
    $ahead = git rev-list --count "@{u}..HEAD" 2>$null
    if ($LASTEXITCODE -eq 0 -and $ahead -gt 0) {
        Write-Host "[i] Working tree clean, but you have $ahead commit(s) ahead of remote." -ForegroundColor Yellow
        $pushAnyway = Read-Host "Push these commits? (y/N)"
        if ($pushAnyway -eq "y") {
            git push origin $branch
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[+] Commits pushed successfully!" -ForegroundColor Green
            } else {
                Write-Host "[!] Push failed." -ForegroundColor Red
            }
            exit 0
        }
    }
    Write-Host "[+] Nothing to commit or push -- working tree clean and up to date." -ForegroundColor Green
    exit 0
}

Write-Host "[*] Changes detected on branch [$branch]:" -ForegroundColor Cyan
git status --short

Write-Host ""
$msg = Read-Host "Enter commit message (or press enter to abort)"

if (-not $msg -or -not $msg.Trim()) {
    Write-Host "[!] No commit message provided. Aborting." -ForegroundColor Yellow
    exit 0
}

Write-Host "[...] Staging changes..." -ForegroundColor Blue
git add -A

Write-Host "[...] Committing changes..." -ForegroundColor Blue
git commit -m "$msg"
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Commit failed." -ForegroundColor Red
    exit 1
}

Write-Host "[...] Pushing to GitHub..." -ForegroundColor Blue
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[+] Pushed to GitHub (branch: $branch)." -ForegroundColor Green
} else {
    Write-Host "[!] Push failed." -ForegroundColor Red
}
