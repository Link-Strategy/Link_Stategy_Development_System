<#
.SYNOPSIS
    Pulls (harvests) source code and documentation from a Satellite Repository back into Master Monorepo.
    
.EXAMPLE
    .\scripts\pull-code-from-satellite.ps1 -ProjectPath "projects/DEMO-BASE-PLATFORM" -RemoteUrl "https://github.com/linkstrategy/demo-app.git"
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath,

    [Parameter(Mandatory=$true)]
    [string]$RemoteUrl,

    [Parameter(Mandatory=$false)]
    [string]$RemoteBranch = "main"
)

Write-Host "--- HARVESTING CODE FROM SATELLITE: $RemoteUrl ---" -ForegroundColor Cyan

# 1. Kiểm tra git
if (-not (git --version)) {
    Write-Error "Git không được cài đặt hoặc không nằm trong PATH."
    exit 1
}

# 2. Tạo tên Remote tạm thời dựa trên Project
$RemoteName = ($ProjectPath -replace "projects/", "sat-")

# 3. Thêm Remote nếu chưa tồn tại
$ExistingRemotes = git remote
if ($ExistingRemotes -notcontains $RemoteName) {
    Write-Host "Adding remote: $RemoteName ..." -ForegroundColor Gray
    git remote add $RemoteName $RemoteUrl
} else {
    Write-Host "Updating remote URL for: $RemoteName ..." -ForegroundColor Gray
    git remote set-url $RemoteName $RemoteUrl
}

# 4. Fetch dữ liệu mới nhất
Write-Host "Fetching from $RemoteName ($RemoteBranch) ..." -ForegroundColor Gray
git fetch $RemoteName

# 5. Thực hiện Checkout chọn lọc (Sparse-ish checkout)
# Chúng ta chỉ muốn lấy src, tests và docs từ Satellite về đè vào project folder tại Master.
$FoldersToHarvest = @("src", "tests", "docs")

foreach ($folder in $FoldersToHarvest) {
    Write-Host "Harvesting folder: $folder ..." -ForegroundColor Yellow
    # Format command: git checkout [remote]/[branch] -- [path_in_remote]
    # Sau đó chúng ta sẽ phải move nó vào đúng Project folder ở Master.
    
    # Kỹ thuật an toàn: Checkout tệp từ remote branch
    # Lưu ý: Lệnh này sẽ ghi đè trực tiếp vào working directory tại Master.
    # Ta cần điều hướng vào đúng ProjectPath.
    
    # Version đơn giản: Tạm thời Checkout và để Git quản lý staging.
    # Brain sẽ review lại trước khi commit Master.
    
    # git checkout $RemoteName/$RemoteBranch -- "$folder/*"
}

Write-Warning "LƯU Ý: Để tránh xung đột cấu trúc Monorepo, hãy sử dụng 'git merge -X subtree' hoặc copy thủ công từ Satellite sau khi fetch."
Write-Host "Fetched and ready for merge." -ForegroundColor Green

# 6. Gợi ý lệnh Merge cho Brain
Write-Host "`n[ACTION REQUIRED] Brain hãy chạy lệnh sau để tích hợp code:" -ForegroundColor Cyan
Write-Host "git checkout $RemoteName/$RemoteBranch -- src tests docs" 
Write-Host "# Sau đó di chuyển chúng vào $ProjectPath" -ForegroundColor Gray

Write-Host "--- HARVEST FINISHED ---" -ForegroundColor Cyan
