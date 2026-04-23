<#
.SYNOPSIS
    Initializes a Satellite Repository from a Master project folder.
    Handles Git initialization, Remote setup, and Initial Rule Push.
    
.EXAMPLE
    .\scripts\init-satellite.ps1 -ProjectPath "projects/LTR-DOC-APP" -RepoName "ls-ltr-doc-app" -Public $false
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath,

    [Parameter(Mandatory=$true)]
    [string]$RepoName,

    [Parameter(Mandatory=$false)]
    [bool]$Public = $false,

    [Parameter(Mandatory=$false)]
    [string]$Organization = "linkstrategy" # Thay đổi theo Org của Brain
)

Write-Host "--- INITIALIZING SATELLITE REPOSITORY ---" -ForegroundColor Cyan

# 1. Kiểm tra môi trường
if (-not (Test-Path $ProjectPath)) {
    Write-Error "ProjectPath '$ProjectPath' không tồn tại. Hãy chạy new-project.ps1 trước."
    exit 1
}

# 2. Khởi tạo Git tại thư mục Project (Cô lập khỏi Monorepo)
$CurrentDir = Get-Location
Set-Location $ProjectPath

Write-Host "Initializing local git context..." -ForegroundColor Gray
if (-not (Test-Path ".git")) {
    git init
    # Tạo .gitignore local nếu chưa có để tránh đẩy rác lên Satellite
    if (-not (Test-Path ".gitignore")) {
        ".env`nnode_modules/`n.DS_Store`ndist/`n.gemini/" | Out-File -FilePath ".gitignore" -Encoding utf8
    }
}

# 3. Tạo Repo trên GitHub (Yêu cầu GitHub CLI 'gh')
Write-Host "Checking for GitHub CLI (gh)..." -ForegroundColor Gray
$ghFound = Get-Command gh -ErrorAction SilentlyContinue
if ($ghFound) {
    Write-Host "Creating repository on GitHub: $Organization/$RepoName ..." -ForegroundColor Yellow
    $visibility = if ($Public) { "--public" } else { "--private" }
    gh repo create "$Organization/$RepoName" $visibility --source=. --remote=origin --push 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Có thể Repo đã tồn tại hoặc lỗi kết nối. Đang tiếp tục thiết lập Remote thủ công..."
    }
} else {
    Write-Warning "Không tìm thấy GitHub CLI (gh). Vui lòng tạo Repo thủ công và chạy: git remote add origin [URL]"
}

# 4. Gắn các Chốt chặn (PR Template & Workflows)
Write-Host "Installing Protection Gates..." -ForegroundColor Gray
$WorkflowDir = ".github/workflows"
if (-not (Test-Path $WorkflowDir)) { New-Item -ItemType Directory -Path $WorkflowDir -Force | Out-Null }

# Copy PR Template & Rule Protection từ Master
Copy-Item -Path "$CurrentDir/.github/pull_request_template.md" -Destination ".github/" -Force
Copy-Item -Path "$CurrentDir/.github/workflows/rules-protection.yml" -Destination "$WorkflowDir/" -Force
Copy-Item -Path "$CurrentDir/.github/CODEOWNERS" -Destination ".github/" -Force

# 5. Đồng bộ Rule & Đặc tả lần đầu (Bootstrap)
Set-Location $CurrentDir
Write-Host "Bootstrapping Rules and Blueprints..." -ForegroundColor Cyan
.\scripts\push-rules-to-satellite.ps1 -ProjectPath $ProjectPath -CommitMessage "feat(governance): initial rule bootstrap from brain" -GitPush

Set-Location $ProjectPath

# 6. Final Push
Write-Host "Updating master branch..." -ForegroundColor Gray
git add .
git commit -m "feat(satellite): initial project skeleton with governance"
git branch -M main
git push -u origin main --force

Set-Location $CurrentDir

Write-Host "`n🚀 SATELLITE READY: $Organization/$RepoName" -ForegroundColor Green -BackgroundColor DarkGreen
Write-Host "Hands can now clone and start working." -ForegroundColor White
Write-Host "--- PROCESS COMPLETE ---" -ForegroundColor Cyan
