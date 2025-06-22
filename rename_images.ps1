# Rename images in 2022 folder
Set-Location "web\src\assets\images\2022"
$i = 1
Get-ChildItem -File | ForEach-Object {
    $extension = $_.Extension
    Rename-Item $_.Name "image$i$extension"
    $i++
}

# Rename images in 2023 folder
Set-Location "..\2023"
$i = 1
Get-ChildItem -File | ForEach-Object {
    $extension = $_.Extension
    Rename-Item $_.Name "image$i$extension"
    $i++
}

# Rename images in 2024 folder
Set-Location "..\2024"
$i = 1
Get-ChildItem -File | ForEach-Object {
    $extension = $_.Extension
    Rename-Item $_.Name "image$i$extension"
    $i++
}

Write-Host "All images have been renamed successfully!" 