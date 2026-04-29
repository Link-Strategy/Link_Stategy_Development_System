<#
.SYNOPSIS
    Pulls (harvests) source code and documentation from a Satellite Repository back into Master Monorepo.
    
.EXAMPLE
    .\scripts\pull-code-from-satellite.ps1 -ProjectPath "projects/DEMO-BASE-PLATFORM" -RemoteUrl "https://github.com/linkstrategy/demo-app.git"
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$ProjectPath,

    [Parameter(Mandatory=$false)]
    [string]$RemoteUrl,

    [Parameter(Mandatory=$false)]
    [string]$RemoteBranch = "main"
)

$ResolvedProjectPath = (Resolve-Path -LiteralPath $ProjectPath).Path

# 0. Tự động lấy URL từ Registry nếu không được cấp
if (-not $RemoteUrl) {
    Write-Host "No RemoteUrl provided. Searching in active-projects.json ..." -ForegroundColor Yellow
    $RegistryPath = "active-projects.json"
    if (Test-Path $RegistryPath) {
        $Registry = Get-Content -Raw $RegistryPath | ConvertFrom-Json
        $normPath = $ProjectPath.Replace("\", "/")
        $project = $Registry.projects | Where-Object { $_.path -eq $normPath -or $_.path -eq "./$normPath" -or $_.path -eq $normPath.Replace("/", "\") }
        if ($project -and $project.remote_url) {
            $RemoteUrl = $project.remote_url
            Write-Host "Found Remote URL: $RemoteUrl" -ForegroundColor Green
        } else {
            Write-Error "Không tìm thấy URL cho dự án tại $ProjectPath trong registry."
            exit 1
        }
    } else {
        Write-Error "active-projects.json không tồn tại. Vui lòng cấp RemoteUrl thủ công."
        exit 1
    }
}

function Add-Pass { param([string]$Message) Write-Host "[PASS] $Message" -ForegroundColor Green }
function Add-Failure { param([string]$Message) Write-Host "[FAIL] $Message" -ForegroundColor Red }

Write-Host "--- HARVESTING CODE FROM SATELLITE: $RemoteUrl ---" -ForegroundColor Cyan

# 1. Kiểm tra git
if (-not (git --version)) {
    Write-Error "Git không được cài đặt hoặc không nằm trong PATH."
    exit 1
}

# 2. Tạo tên Remote tạm thời dựa trên Project Folder Name
$ProjectFolderName = Split-Path $ResolvedProjectPath -Leaf
$RemoteName = "sat-$ProjectFolderName"

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

# 5. Thực hiện Checkout chọn lọc (Selective Harvest)
# Chúng ta sẽ sử dụng 'git checkout' tệp từ remote branch vào một thư mục tạm, 
# sau đó copy chúng vào đúng ProjectPath để tránh làm bẩn Root Monorepo.

$TempHarvestPath = Join-Path $env:TEMP "ls-harvest-$([Guid]::NewGuid().ToString().Substring(0,8))"
New-Item -ItemType Directory -Path $TempHarvestPath -Force | Out-Null

try {
    Write-Host "Harvesting src, tests, docs to temporary location..." -ForegroundColor Yellow
    
    # Sử dụng git checkout-index hoặc git archive để lấy file mà không làm ảnh hưởng working tree của Master
    git archive --format=tar "$($RemoteName)/$($RemoteBranch)" src tests docs | tar -x -C $TempHarvestPath
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Syncing harvested files to $ProjectPath ..." -ForegroundColor Cyan
        Copy-Item -Path "$TempHarvestPath\*" -Destination $ResolvedProjectPath -Recurse -Force
        Add-Pass "Harvesting and path mapping complete."
    } else {
        Add-Failure "Failed to archive/extract files from satellite remote."
    }
} catch {
    Add-Failure "Error during harvesting: $($_.Exception.Message)"
} finally {
    if (Test-Path $TempHarvestPath) {
        Remove-Item -Path $TempHarvestPath -Recurse -Force
    }
}

Write-Host "`n[ACTION REQUIRED] Brain hãy rà soát lại các thay đổi tại $ProjectPath và thực hiện commit Master." -ForegroundColor Cyan
Write-Host "--- HARVEST FINISHED ---" -ForegroundColor Cyan
