param (
    [Parameter(Mandatory=$false)]
    [string]$ProjectPath = "."
)

$ErrorActionPreference = "Stop"

$ResolvedProjectPath = (Resolve-Path -LiteralPath $ProjectPath).Path
$MasterRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..\..\..\..")).Path
$ReportPath = Join-Path $ResolvedProjectPath "GATE_REPORT.md"
$Failures = New-Object System.Collections.Generic.List[string]
$Warnings = New-Object System.Collections.Generic.List[string]
$Passes = New-Object System.Collections.Generic.List[string]

function Add-Failure {
    param([string]$Message)
    $Failures.Add($Message)
    Write-Host "[FAIL] $Message" -ForegroundColor Red
}

function Add-Warning {
    param([string]$Message)
    $Warnings.Add($Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

function Add-Pass {
    param([string]$Message)
    $Passes.Add($Message)
    Write-Host "[PASS] $Message" -ForegroundColor Green
}

function Test-RequiredPath {
    param(
        [string]$Label,
        [string]$Path
    )

    if (Test-Path -LiteralPath $Path) {
        Add-Pass "$Label found."
        return $true
    }

    Add-Failure "$Label is missing."
    return $false
}

function Test-FileHashMatch {
    param(
        [string]$SourcePath,
        [string]$TargetPath,
        [string]$Label
    )

    if (-not (Test-Path -LiteralPath $TargetPath)) {
        Add-Failure "$Label is missing from project."
        return
    }

    $SourceHash = (Get-FileHash -LiteralPath $SourcePath -Algorithm MD5).Hash
    $TargetHash = (Get-FileHash -LiteralPath $TargetPath -Algorithm MD5).Hash

    if ($SourceHash -ne $TargetHash) {
        Add-Failure "$Label has been modified outside Brain governance."
    } else {
        Add-Pass "$Label matches Master governance."
    }
}

function Invoke-TestCommand {
    param(
        [string]$WorkingDirectory,
        [string]$Command,
        [string[]]$Arguments,
        [string]$Label
    )

    Write-Host "[RUN] $Label" -ForegroundColor Cyan
    Push-Location $WorkingDirectory
    try {
        & $Command @Arguments
        if ($LASTEXITCODE -ne 0) {
            Add-Failure "$Label failed."
        } else {
            Add-Pass "$Label passed."
        }
    } catch {
        Add-Failure "$Label failed: $($_.Exception.Message)"
    } finally {
        Pop-Location
    }
}

function Test-SecretPatterns {
    param([string]$RootPath)

    $blockedFiles = @(
        ".env",
        ".env.local",
        ".env.production",
        ".env.development",
        "id_rsa",
        "id_dsa"
    )

    foreach ($fileName in $blockedFiles) {
        $matches = Get-ChildItem -Path $RootPath -Recurse -Force -File -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -ieq $fileName }
        foreach ($match in $matches) {
            Add-Failure "Blocked secret file detected: $($match.FullName)"
        }
    }

    $sensitiveExtensions = @("*.pem", "*.p12", "*.pfx", "*.key")
    foreach ($pattern in $sensitiveExtensions) {
        $matches = Get-ChildItem -Path $RootPath -Recurse -Force -File -Filter $pattern -ErrorAction SilentlyContinue
        foreach ($match in $matches) {
            Add-Failure "Sensitive key material detected: $($match.FullName)"
        }
    }

    $textPatterns = @(
        "AKIA[0-9A-Z]{16}",
        "-----BEGIN (RSA|EC|DSA|OPENSSH|PRIVATE KEY)-----",
        "(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*['""][^'""]{8,}['""]"
    )

    $candidateFiles = Get-ChildItem -Path $RootPath -Recurse -Force -File -Include *.md,*.json,*.js,*.ts,*.tsx,*.jsx,*.py,*.ps1,*.yml,*.yaml,*.env.example -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch "\\node_modules\\|\\dist\\|\\build\\|\\.git\\" }

    foreach ($file in $candidateFiles) {
        $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction SilentlyContinue
        if (-not $content) {
            continue
        }

        foreach ($pattern in $textPatterns) {
            if ($content -match $pattern) {
                Add-Failure "Potential secret pattern detected in $($file.FullName)"
                break
            }
        }
    }
}

Write-Host "--- LINK STRATEGY: VERIFY GATE (PHASE 1) ---" -ForegroundColor Cyan
Write-Host "Project Path: $ResolvedProjectPath"

if (-not (Test-Path -LiteralPath $ResolvedProjectPath)) {
    Write-Error "Path '$ResolvedProjectPath' does not exist."
}

Write-Host "`n[1/5] Governance Integrity" -ForegroundColor Cyan
$MasterRulesFolder = Join-Path $MasterRoot ".agents\rules"
$ProjectRulesFolder = Join-Path $ResolvedProjectPath ".agents\rules"

if (-not (Test-Path -LiteralPath $ProjectRulesFolder)) {
    Add-Failure "Governance rules folder is missing."
} else {
    $RulesToProtect = Get-ChildItem -LiteralPath $MasterRulesFolder -Filter *.md
    foreach ($rule in $RulesToProtect) {
        $projectRulePath = Join-Path $ProjectRulesFolder $rule.Name
        Test-FileHashMatch -SourcePath $rule.FullName -TargetPath $projectRulePath -Label "Rule $($rule.Name)"
    }
}

$MasterGeminiPath = Join-Path $MasterRoot "GEMINI.md"
$ProjectGeminiPath = Join-Path $ResolvedProjectPath "GEMINI.md"
if (Test-Path -LiteralPath $MasterGeminiPath) {
    Test-FileHashMatch -SourcePath $MasterGeminiPath -TargetPath $ProjectGeminiPath -Label "GEMINI.md"
}

Write-Host "`n[2/5] Required Project Structure" -ForegroundColor Cyan
Test-RequiredPath -Label "README.md" -Path (Join-Path $ResolvedProjectPath "README.md") | Out-Null
Test-RequiredPath -Label "LOGS.md" -Path (Join-Path $ResolvedProjectPath "LOGS.md") | Out-Null
Test-RequiredPath -Label "02_QA_LOGS.md" -Path (Join-Path $ResolvedProjectPath "02_QA_LOGS.md") | Out-Null
Test-RequiredPath -Label "docs/blueprints/01_TASK_SPEC.md" -Path (Join-Path $ResolvedProjectPath "docs\blueprints\01_TASK_SPEC.md") | Out-Null
Test-RequiredPath -Label "src/" -Path (Join-Path $ResolvedProjectPath "src") | Out-Null
Test-RequiredPath -Label "tests/" -Path (Join-Path $ResolvedProjectPath "tests") | Out-Null

Write-Host "`n[3/5] Spec-First Compliance" -ForegroundColor Cyan
$SpecPath = Join-Path $ResolvedProjectPath "docs\blueprints\01_TASK_SPEC.md"
if (Test-Path -LiteralPath $SpecPath) {
    $specContent = Get-Content -LiteralPath $SpecPath -Raw
    $requiredSpecMarkers = @(
        "Strategic Context",
        "Logic Visualization",
        "Data Schema",
        "Technical Contract",
        "Definition of Done"
    )

    foreach ($marker in $requiredSpecMarkers) {
        if ($specContent -match [regex]::Escape($marker)) {
            Add-Pass "Spec section '$marker' present."
        } else {
            Add-Failure "Spec section '$marker' is missing."
        }
    }

    $placeholderPatterns = @(
        "\[Tên Module/Task\]",
        "\[TODO\]",
        "\[TBD\]",
        "\[Mô tả",
        "<replace",
        "lorem ipsum"
    )

    foreach ($pattern in $placeholderPatterns) {
        if ($specContent -match $pattern) {
            Add-Failure "Spec still contains placeholder content ('$pattern')."
            break
        }
    }
}

Write-Host "`n[4/5] Test Execution" -ForegroundColor Cyan
$TestsPath = Join-Path $ResolvedProjectPath "tests"
$PackageJsonPath = Join-Path $ResolvedProjectPath "package.json"
$PyProjectPath = Join-Path $ResolvedProjectPath "pyproject.toml"
$RequirementsPath = Join-Path $ResolvedProjectPath "requirements.txt"
$PyTestIniPath = Join-Path $ResolvedProjectPath "pytest.ini"

if (-not (Test-Path -LiteralPath $TestsPath)) {
    Add-Failure "Tests directory is missing, cannot execute verification tests."
} else {
    $testsExist = @(Get-ChildItem -Path $TestsPath -Recurse -File -ErrorAction SilentlyContinue).Count -gt 0
    if (-not $testsExist) {
        Add-Failure "Tests directory exists but contains no test files."
    } elseif (Test-Path -LiteralPath $PackageJsonPath) {
        $packageJson = Get-Content -LiteralPath $PackageJsonPath -Raw | ConvertFrom-Json
        if (-not $packageJson.scripts.test) {
            Add-Failure "package.json exists but no test script is defined."
        } else {
            $packageManager = "npm"
            if (Test-Path -LiteralPath (Join-Path $ResolvedProjectPath "pnpm-lock.yaml")) {
                $packageManager = "pnpm"
            } elseif (Test-Path -LiteralPath (Join-Path $ResolvedProjectPath "yarn.lock")) {
                $packageManager = "yarn"
            }

            if (-not (Get-Command $packageManager -ErrorAction SilentlyContinue)) {
                Add-Failure "$packageManager is not installed, cannot run project tests."
            } else {
                $arguments = if ($packageManager -eq "npm") { @("test") } else { @("test") }
                Invoke-TestCommand -WorkingDirectory $ResolvedProjectPath -Command $packageManager -Arguments $arguments -Label "$packageManager test"
            }
        }
    } elseif ((Test-Path -LiteralPath $PyProjectPath) -or (Test-Path -LiteralPath $RequirementsPath) -or (Test-Path -LiteralPath $PyTestIniPath)) {
        if (-not (Get-Command pytest -ErrorAction SilentlyContinue)) {
            Add-Failure "pytest is not installed, cannot run Python tests."
        } else {
            Invoke-TestCommand -WorkingDirectory $ResolvedProjectPath -Command "pytest" -Arguments @() -Label "pytest"
        }
    } else {
        Add-Failure "No supported test runner detected. Define a runnable test command for Phase 1 gate."
    }
}

Write-Host "`n[5/5] Secret Hygiene" -ForegroundColor Cyan
Test-SecretPatterns -RootPath $ResolvedProjectPath
if ($Failures.Count -eq 0) {
    Add-Pass "No blocked secret files or obvious secret patterns detected."
}

# --- Generate Report File ---
$ReportContent = @"
# LINK STRATEGY: GATE VERIFICATION REPORT
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Project: $ResolvedProjectPath
Status: $(if ($Failures.Count -eq 0) { "PASS" } else { "FAIL" })

## Summary
- **Passes:** $($Passes.Count)
- **Warnings:** $($Warnings.Count)
- **Failures:** $($Failures.Count)

## Details
### ❌ Failures
$(if ($Failures.Count -gt 0) { $Failures | ForEach-Object { "- $_" } | Out-String } else { "None" })

### ⚠️ Warnings
$(if ($Warnings.Count -gt 0) { $Warnings | ForEach-Object { "- $_" } | Out-String } else { "None" })

### ✅ Passes
$(if ($Passes.Count -gt 0) { $Passes | ForEach-Object { "- $_" } | Out-String } else { "None" })

---
*Audit Trail: Verified by Link Strategy Engine Ops.*
"@

$ReportContent | Out-File -FilePath $ReportPath -Encoding utf8
Write-Host "`nReport saved to: $ReportPath" -ForegroundColor Gray

if ($Failures.Count -gt 0) {
    Write-Host "STATUS: FAIL" -ForegroundColor Red
    foreach ($failure in $Failures) {
        Write-Host " - $failure" -ForegroundColor Red
    }
    exit 1
}

Write-Host "STATUS: PASS" -ForegroundColor Green
exit 0
