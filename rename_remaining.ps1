# Handle remaining files in 2022 folder
Set-Location "web\src\assets\images\2022"

# Get files that still have long names (not starting with "image")
$remainingFiles = Get-ChildItem -File | Where-Object { $_.Name -notlike "image*" }

# Find the next available number
$existingNumbers = Get-ChildItem -File | Where-Object { $_.Name -like "image*" } | ForEach-Object { 
    if ($_.Name -match "image(\d+)") { [int]$matches[1] } 
} | Sort-Object
$nextNumber = 1
if ($existingNumbers) {
    $nextNumber = ($existingNumbers | Select-Object -Last 1) + 1
}

# Rename remaining files
foreach ($file in $remainingFiles) {
    $extension = $file.Extension
    $newName = "image$nextNumber$extension"
    try {
        Rename-Item $file.Name $newName -ErrorAction Stop
        Write-Host "Renamed: $($file.Name) -> $newName"
        $nextNumber++
    }
    catch {
        Write-Host "Failed to rename: $($file.Name)"
    }
}

# Handle remaining files in 2023 folder
Set-Location "..\2023"

# Get files that still have long names (not starting with "image")
$remainingFiles = Get-ChildItem -File | Where-Object { $_.Name -notlike "image*" }

# Find the next available number
$existingNumbers = Get-ChildItem -File | Where-Object { $_.Name -like "image*" } | ForEach-Object { 
    if ($_.Name -match "image(\d+)") { [int]$matches[1] } 
} | Sort-Object
$nextNumber = 1
if ($existingNumbers) {
    $nextNumber = ($existingNumbers | Select-Object -Last 1) + 1
}

# Rename remaining files
foreach ($file in $remainingFiles) {
    $extension = $file.Extension
    $newName = "image$nextNumber$extension"
    try {
        Rename-Item $file.Name $newName -ErrorAction Stop
        Write-Host "Renamed: $($file.Name) -> $newName"
        $nextNumber++
    }
    catch {
        Write-Host "Failed to rename: $($file.Name)"
    }
}

Write-Host "Remaining files have been processed!" 