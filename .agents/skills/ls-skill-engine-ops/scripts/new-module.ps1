param (
    [Parameter(Mandatory=$true)]
    [string]$projectPath,

    [Parameter(Mandatory=$true)]
    [string]$moduleName
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $projectPath)) {
    Write-Error "Project path $projectPath does not exist."
}

$moduleDir = "$projectPath\src\$moduleName"
$moduleDocsDir = "$projectPath\docs\blueprints\$moduleName"
$templateDir = ".agents\templates"

Write-Host "🚀 Creating Module: $moduleName"

New-Item -ItemType Directory -Path $moduleDir -Force | Out-Null
New-Item -ItemType Directory -Path $moduleDocsDir -Force | Out-Null

$specSrc = "$templateDir\01_TASK_SPEC_TEMPLATE.md"
$specDest = "$moduleDocsDir\01_TASK_SPEC.md"

if (Test-Path $specSrc) {
    Copy-Item -Path $specSrc -Destination $specDest
}

$readmeContent = "# MODULE: $moduleName`n`n[Description]`n`n- [Spec](01_TASK_SPEC.md)"
$readmeContent | Out-File -FilePath "$moduleDir\README.md" -Encoding utf8

Write-Host "✅ Success: Module added."
