param (
    [Parameter(Mandatory=$true)]
    [string]$clientId,

    [Parameter(Mandatory=$true)]
    [string]$projectName,

    [Parameter(Mandatory=$true)]
    [string]$projectType,

    [Parameter(Mandatory=$false)]
    [string]$BasePath = "projects"
)

$ErrorActionPreference = "Stop"

$projectDirName = "$($clientId.ToUpper())-$($projectName)"
$projectPath = Join-Path $BasePath $projectDirName
$templateDir = ".agents\templates"

Write-Host "🚀 Starting Project Factory for: $projectDirName" -ForegroundColor Cyan

if (Test-Path $projectPath) {
    Write-Warning "Project $projectDirName already exists at $projectPath."
    return
}

# 1. Create Folders
Write-Host "Creating structure at $projectPath ..." -ForegroundColor Gray
New-Item -ItemType Directory -Path "$projectPath\docs\blueprints" -Force | Out-Null
New-Item -ItemType Directory -Path "$projectPath\src" -Force | Out-Null
New-Item -ItemType Directory -Path "$projectPath\tests" -Force | Out-Null

# 2. Copy Templates
Copy-Item -Path "$templateDir\01_TASK_SPEC_TEMPLATE.md" -Destination "$projectPath\docs\blueprints\01_TASK_SPEC.md"
Copy-Item -Path "$templateDir\02_QA_LOGS_TEMPLATE.md" -Destination "$projectPath\02_QA_LOGS.md"
Copy-Item -Path "$templateDir\LOGS_TEMPLATE.md" -Destination "$projectPath\LOGS.md"
if (Test-Path "$templateDir\ENV_EXAMPLE_TEMPLATE") {
    Copy-Item -Path "$templateDir\ENV_EXAMPLE_TEMPLATE" -Destination "$projectPath\.env.example"
}

# 3. Create README
$readmeHeader = "# PROJECT: $projectDirName ($projectType)"
$readmeInfo = "- Client: $clientId`n- Created: $(Get-Date -Format 'yyyy-MM-dd')"
$readmeDoc1 = "1. [Task Blueprint](docs/blueprints/01_TASK_SPEC.md)"
$readmeDoc2 = "2. [QA Logs](02_QA_LOGS.md)"
$readmeDoc3 = "3. [Progress Logs](LOGS.md)"

$content = "$readmeHeader`n`n$readmeInfo`n`n## Documents`n`n$readmeDoc1`n$readmeDoc2`n$readmeDoc3"
$content | Out-File -FilePath "$projectPath\README.md" -Encoding utf8

# 4. Automatic Registry in active-projects.json
$RegistryPath = "active-projects.json"
if (Test-Path $RegistryPath) {
    Write-Host "Registering project in $RegistryPath ..." -ForegroundColor Yellow
    $Registry = Get-Content -Raw $RegistryPath | ConvertFrom-Json
    
    $NewEntry = @{
        id = $projectDirName
        path = $projectPath.Replace("\", "/")
        remote_url = ""
        status = "active"
        description = "Automatically generated project for $clientId."
    }
    
    $Registry.projects += $NewEntry
    $Registry | ConvertTo-Json -Depth 10 | Out-File -FilePath $RegistryPath -Encoding utf8
}

# 5. Optional: Register in ASSET_INDEX.md
$AssetIndexPath = "ASSET_INDEX.md"
if (Test-Path $AssetIndexPath) {
    Write-Host "Registering in $AssetIndexPath ..." -ForegroundColor Yellow
    $AssetEntry = "| ``$projectDirName`` | Project | ``$($projectPath.Replace("\", "/"))/`` | Brain | Active | Automatically generated project. | N/A | Project structure | Mandatory | N/A |"
    Add-Content -Path $AssetIndexPath -Value $AssetEntry
}

Write-Host "✅ Success: Project created and registered at $projectPath" -ForegroundColor Green
