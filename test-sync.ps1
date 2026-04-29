param ([string]$ProjectPath)
Write-Host "Syncing to $ProjectPath"
if (-not (Test-Path $ProjectPath)) {
    Write-Error "Path not found"
} else {
    Write-Host "Path OK"
}
