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

# 6. KIỂM TRA TÀI SẢN (HARDENING POTENTIAL)
$HardeningFile = Join-Path $projectPath ".agents/templates/HARDENING_PROPOSAL_TEMPLATE.md"
if (-not (Test-Path $HardeningFile)) {
    Write-Warning "Thiếu đề xuất hardening."
    $score -= 5
}

# --- NEW: GOVERNANCE INTEGRITY CHECK (RULE PROTECTION) ---
Write-Host "`n[Rule Protection] Examining Governance Integrity..." -ForegroundColor Cyan

$MasterRulesFolder = ".agents/rules"
$ProjectRulesFolder = Join-Path $projectPath ".agents/rules"

if (Test-Path $ProjectRulesFolder) {
    $RulesToProtect = Get-ChildItem -Path $MasterRulesFolder -Filter *.md
    foreach ($rule in $RulesToProtect) {
        $masterRulePath = $rule.FullName
        $projectRulePath = Join-Path $ProjectRulesFolder $rule.Name
        
        if (Test-Path $projectRulePath) {
            $MasterHash = (Get-FileHash $masterRulePath -Algorithm MD5).Hash
            $ProjectHash = (Get-FileHash $projectRulePath -Algorithm MD5).Hash

            if ($MasterHash -ne $ProjectHash) {
                Write-Error "VI PHẠM: Bộ luật $($rule.Name) đã bị sửa đổi trái phép!"
                $score -= 30 # Trừ điểm cho mỗi file bị sửa
                $GateStatus = "REJECTED (Integrity Violation: $($rule.Name))"
            }
        } else {
            Write-Error "VI PHẠM: Luật $($rule.Name) đã bị xóa!"
            $score -= 40
        }
    }
} else {
    Write-Error "VI PHẠM CỰC NGHIÊM TRỌNG: Toàn bộ thư mục luật đã bị xóa!"
    $score = 0
    $GateStatus = "REJECTED (Rules Folder Missing)"
}
# ----------------------------------------------------------

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
