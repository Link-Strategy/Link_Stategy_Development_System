param (
    [Parameter(Mandatory=$true)]
    [string]$clientId,

    [Parameter(Mandatory=$true)]
    [string]$projectName,

    [Parameter(Mandatory=$true)]
    [string]$projectType
)

$ErrorActionPreference = "Stop"

$projectDirName = "$($clientId.ToUpper())-$($projectName)"
$projectPath = "projects\$projectDirName"
$templateDir = ".agents\templates"

Write-Host "🚀 Starting Project Factory for: $projectDirName"

if (Test-Path $projectPath) {
    Write-Warning "Project $projectDirName already exists."
    return
}

# Create Folders
New-Item -ItemType Directory -Path "$projectPath\docs\blueprints" -Force | Out-Null
New-Item -ItemType Directory -Path "$projectPath\src" -Force | Out-Null
New-Item -ItemType Directory -Path "$projectPath\tests" -Force | Out-Null

# Copy Templates
Copy-Item -Path "$templateDir\01_TASK_SPEC_TEMPLATE.md" -Destination "$projectPath\docs\blueprints\01_TASK_SPEC.md"
Copy-Item -Path "$templateDir\02_QA_LOGS_TEMPLATE.md" -Destination "$projectPath\02_QA_LOGS.md"
Copy-Item -Path "$templateDir\LOGS_TEMPLATE.md" -Destination "$projectPath\LOGS.md"

# Create README (Using simple double quotes for safety)
$readmeHeader = "# PROJECT: $projectDirName ($projectType)"
$readmeInfo = "- Client: $clientId`n- Created: $(Get-Date -Format 'yyyy-MM-dd')"
$readmeDoc1 = "1. [Task Blueprint](docs/blueprints/01_TASK_SPEC.md)"
$readmeDoc2 = "2. [QA Logs](02_QA_LOGS.md)"
$readmeDoc3 = "3. [Progress Logs](LOGS.md)"

$content = "$readmeHeader`n`n$readmeInfo`n`n## Documents`n`n$readmeDoc1`n$readmeDoc2`n$readmeDoc3"
$content | Out-File -FilePath "$projectPath\README.md" -Encoding utf8

Write-Host "✅ Success: Project created at $projectPath"
