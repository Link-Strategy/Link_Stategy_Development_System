<#
.SYNOPSIS
    Pushes governance rules and workflows from Master Monorepo to a specific Project/Satellite.
    
.EXAMPLE
    .\scripts\push-rules-to-satellite.ps1 -ProjectPath "projects/DEMO-BASE-PLATFORM" -CommitMessage "harden: update governance rules"
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath,

    [Parameter(Mandatory=$false)]
    [string]$CommitMessage = "chore(sync): push updated rules from brain",

    [Parameter(Mandatory=$false)]
    [switch]$GitPush = $false
)

# 1. Xác định đường dẫn nguồn (Master)
$MasterRulesPath = ".agents/rules"
$MasterWorkflowsPath = ".agents/workflows"
$MasterTemplatesPath = ".agents/templates"

# 2. Kiểm tra tính hợp lệ của Project đích
if (-not (Test-Path $ProjectPath)) {
    Write-Error "Project path '$ProjectPath' không tồn tại."
    exit 1
}

$TargetAgentsPath = Join-Path $ProjectPath ".agents"
if (-not (Test-Path $TargetAgentsPath)) {
    New-Item -ItemType Directory -Path $TargetAgentsPath -Force | Out-Null
}

Write-Host "--- STARTING RULE SYNC TO: $ProjectPath ---" -ForegroundColor Cyan

# 3. Đồng bộ hóa các thư mục Rules/Workflows/Templates
$FoldersToSync = @("rules", "workflows", "templates")

foreach ($folder in $FoldersToSync) {
    $src = Join-Path ".agents" $folder
    $dest = Join-Path $TargetAgentsPath $folder
    
    if (Test-Path $src) {
        Write-Host "Syncing folder: $folder ..." -ForegroundColor Gray
        Copy-Item -Path "$src\*" -Destination $dest -Recurse -Force
    }
}

# 4. Sao chép .cursorrules (Bản thực thi)
if (Test-Path ".cursorrules") {
    Write-Host "Syncing .cursorrules ..." -ForegroundColor Gray
    Copy-Item -Path ".cursorrules" -Destination $ProjectPath -Force
}

Write-Host "Local Rule Sync Complete!" -ForegroundColor Green

# 5. FORCE SYNC (GIT PUSH)
if ($GitPush) {
    Write-Host "--- DETECTING GIT STATUS IN PROJECT FOLDER ---" -ForegroundColor Yellow
    
    # Lưu lại thư mục hiện tại và nhảy vào Project
    $CurrentDir = Get-Location
    Set-Location $ProjectPath
    
    try {
        # Kiểm tra xem có remote chính thức của Satellite không
        $RemoteURL = git remote get-url origin 2>$null
        if (-not $RemoteURL) {
            Write-Warning "Không tìm thấy Remote 'origin'. Vui lòng thiết lập Remote cho Project trước khi Force Sync."
            return
        }

        Write-Host "Project is linked to: $RemoteURL" -ForegroundColor Gray

        # Stage các thay đổi trong .agents và .cursorrules
        git add .agents/*
        git add .cursorrules

        # Kiểm tra xem có thay đổi gì thực sự không
        $Diff = git status --porcelain
        if (-not $Diff) {
            Write-Host "No changes detected. Rules are already up to date." -ForegroundColor Green
        } else {
            Write-Host "Changes detected. Committing and Pushing law to Hands..." -ForegroundColor Cyan
            git commit -m "$CommitMessage"
            git push origin main --force # FORCE SYNC: Đè luật lên đầu Hands
            Write-Host "RULE ENFORCED SUCCESSFULLY!" -ForegroundColor Green -BackgroundColor DarkGreen
        }
    } catch {
        Write-Error "Lỗi khi thực hiện Git Sync tại $ProjectPath"
    } finally {
        Set-Location $CurrentDir
    }
}

Write-Host "--- SYNC FINISHED ---" -ForegroundColor Cyan
