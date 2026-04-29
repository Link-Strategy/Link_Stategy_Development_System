<#
.SYNOPSIS
    Initializes a Satellite Repository from a Master project folder.
    Handles Git initialization, remote setup, bootstrap sync, and branch protection.

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
    [string]$Organization = "linkstrategy"
)

$ErrorActionPreference = "Stop"

function Set-RepositoryBranchProtection {
    param(
        [Parameter(Mandatory=$true)]
        [string]$RepoOwner,

        [Parameter(Mandatory=$true)]
        [string]$RepoName
    )

    $ProtectionPayload = @{
        required_status_checks = @{
            strict = $true
            contexts = @(
                "verification-gate",
                "block-illegal-changes"
            )
        }
        enforce_admins = $true
        required_pull_request_reviews = @{
            dismissal_restrictions = @{}
            dismiss_stale_reviews = $true
            require_code_owner_reviews = $true
            required_approving_review_count = 1
            require_last_push_approval = $false
        }
        restrictions = $null
        required_linear_history = $false
        allow_force_pushes = $false
        allow_deletions = $false
        block_creations = $false
        required_conversation_resolution = $true
        lock_branch = $false
        allow_fork_syncing = $true
    } | ConvertTo-Json -Depth 10

    Write-Host "Applying branch protection to $RepoOwner/$RepoName (main)..." -ForegroundColor Yellow
    $null = $ProtectionPayload | gh api `
        --method PUT `
        -H "Accept: application/vnd.github+json" `
        "/repos/$RepoOwner/$RepoName/branches/main/protection" `
        --input -

    if ($LASTEXITCODE -ne 0) {
        throw "Failed to apply branch protection to $RepoOwner/$RepoName."
    }

    Write-Host "Branch protection applied successfully." -ForegroundColor Green
}

Write-Host "--- INITIALIZING SATELLITE REPOSITORY ---" -ForegroundColor Cyan

if (-not (Test-Path $ProjectPath)) {
    Write-Error "ProjectPath '$ProjectPath' does not exist. Run new-project.ps1 first."
    exit 1
}

$CurrentDir = Get-Location
Set-Location $ProjectPath

Write-Host "Initializing local git context..." -ForegroundColor Gray
if (-not (Test-Path ".git")) {
    git init
    if (-not (Test-Path ".gitignore")) {
        ".env`nnode_modules/`n.DS_Store`ndist/`n.gemini/" | Out-File -FilePath ".gitignore" -Encoding utf8
    }
}

Write-Host "Checking for GitHub CLI (gh)..." -ForegroundColor Gray
$ghFound = Get-Command gh -ErrorAction SilentlyContinue
if ($ghFound) {
    Write-Host "Creating repository on GitHub: $Organization/$RepoName ..." -ForegroundColor Yellow
    $visibility = if ($Public) { "--public" } else { "--private" }
    gh repo create "$Organization/$RepoName" $visibility --source=. --remote=origin --push 2>$null
    if ($LASTEXITCODE -eq 0) {
        $RemoteURL = gh repo view "$Organization/$RepoName" --json url --template "{{.url}}"
        Write-Host "Created repository: $RemoteURL" -ForegroundColor Green
    } else {
        Write-Warning "Repository may already exist or creation failed. Continue with the existing remote if configured."
        $RemoteURL = git remote get-url origin 2>$null
    }
} else {
    Write-Warning "GitHub CLI (gh) not found. Create the repo manually and run: git remote add origin [URL]"
    $RemoteURL = git remote get-url origin 2>$null
}

Write-Host "Installing protection assets..." -ForegroundColor Gray
$WorkflowDir = ".github/workflows"
if (-not (Test-Path $WorkflowDir)) {
    New-Item -ItemType Directory -Path $WorkflowDir -Force | Out-Null
}

Copy-Item -Path "$CurrentDir/.github/pull_request_template.md" -Destination ".github/" -Force
Copy-Item -Path "$CurrentDir/.github/workflows/rules-protection.yml" -Destination "$WorkflowDir/" -Force
Copy-Item -Path "$CurrentDir/.agents/templates/verify-gate.yml" -Destination "$WorkflowDir/" -Force
Copy-Item -Path "$CurrentDir/.github/CODEOWNERS" -Destination ".github/" -Force

Set-Location $CurrentDir
Write-Host "Bootstrapping rules and blueprints..." -ForegroundColor Cyan
.\.agents\skills\ls-skill-engine-ops\scripts\push-rules-to-satellite.ps1 -ProjectPath $ProjectPath -CommitMessage "feat(governance): initial rule bootstrap from brain" -GitPush

Set-Location $ProjectPath
Write-Host "Updating main branch..." -ForegroundColor Gray
git add .
git branch -M main
# Chỉ dùng force nếu thực sự cần thiết (init mới), nhưng dùng force-with-lease cho an toàn
git push -u origin main --force-with-lease

if ($ghFound) {
    try {
        Set-RepositoryBranchProtection -RepoOwner $Organization -RepoName $RepoName
    } catch {
        Write-Warning $_.Exception.Message
        Write-Warning "Repository was created, but branch protection still needs manual configuration."
    }
}

# Update Registry with Remote URL
Set-Location $CurrentDir
$RegistryPath = "active-projects.json"
if (Test-Path $RegistryPath) {
    Write-Host "Updating Remote URL in $RegistryPath ..." -ForegroundColor Yellow
    $Registry = Get-Content -Raw $RegistryPath | ConvertFrom-Json
    $normPath = $ProjectPath.Replace("\", "/")
    # Match path or path with ./ prefix
    $project = $Registry.projects | Where-Object { $_.path -eq $normPath -or $_.path -eq "./$normPath" -or $_.path -eq $normPath.Replace("/", "\") }
    if ($project) {
        $project.remote_url = $RemoteURL
        $Registry | ConvertTo-Json -Depth 10 | Out-File -FilePath $RegistryPath -Encoding utf8
        Write-Host "Registry updated." -ForegroundColor Gray
    } else {
        Write-Warning "Could not find project with path '$normPath' in $RegistryPath."
    }
}

Write-Host "`nSATELLITE READY: $Organization/$RepoName" -ForegroundColor Green -BackgroundColor DarkGreen
Write-Host "Hands can now clone and start working." -ForegroundColor White
Write-Host "--- PROCESS COMPLETE ---" -ForegroundColor Cyan
