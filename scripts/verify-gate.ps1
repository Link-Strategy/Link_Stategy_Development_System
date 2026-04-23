param (
    [Parameter(Mandatory=$true)]
    [string]$projectPath
)

$ErrorActionPreference = "Stop"

Write-Host "Starting Verification Gate for: $projectPath"

if (-not (Test-Path $projectPath)) {
    Write-Error "Path '$projectPath' does not exist."
}

$score = 100

function Test-Requirement {
    param($Name, $Path, $Penalty)
    if (Test-Path $Path) {
        Write-Host "[PASS] $Name found."
        return $true
    } else {
        Write-Host "[FAIL] $Name missing! (-$Penalty pts)"
        return $false
    }
}

Write-Host ""
Write-Host "--- Physical Structure Check ---"

if (-not (Test-Requirement "README.md" "$projectPath\README.md" 10)) { $score -= 10 }
if (-not (Test-Requirement "LOGS.md" "$projectPath\LOGS.md" 10)) { $score -= 10 }
if (-not (Test-Requirement "02_QA_LOGS.md" "$projectPath\02_QA_LOGS.md" 10)) { $score -= 10 }
if (-not (Test-Requirement "Task Spec (01_TASK_SPEC.md)" "$projectPath\docs\blueprints\01_TASK_SPEC.md" 20)) { $score -= 20 }
if (-not (Test-Requirement "Source Directory (src/)" "$projectPath\src" 10)) { $score -= 10 }
if (-not (Test-Requirement "Tests Directory (tests/)" "$projectPath\tests" 10)) { $score -= 10 }

Write-Host ""
Write-Host "--- Content Integrity Check ---"

$specPath = "$projectPath\docs\blueprints\01_TASK_SPEC.md"
if (Test-Path $specPath) {
    $specContent = Get-Content $specPath -Raw
    # Use .Contains() to avoid wildcard parsing issues with brackets
    if ($specContent.Contains("[Tên Module/Task]")) {
        Write-Host "[WARN] Task Spec seems to be using placeholder text!"
        $score -= 10
    } else {
        Write-Host "[PASS] Task Spec content seems valid (no placeholder found)."
    }
}

Write-Host ""
Write-Host "--- Final Verification Results ---"
Write-Host "TOTAL GATE SCORE: $score / 100"

if ($score -lt 80) {
    Write-Host "STATUS: REJECTED. Please fix the missing items before submission."
    # We don't exit 1 here yet, just finish the report
} elseif ($score -lt 100) {
    Write-Host "STATUS: PARTIAL PASS. Needs minor fixes."
} else {
    Write-Host "STATUS: FULL PASS. Ready for Brain Review!"
}

Write-Host ""
Write-Host "Audit session completed."
