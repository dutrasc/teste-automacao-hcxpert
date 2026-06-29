param(
  [string]$Feature = "manual"
)

<#
Exemplo de uso:
powershell -ExecutionPolicy Bypass -File scripts/capture-chrome-window.ps1 -Feature login.feature
#>

$ErrorActionPreference = "Stop"

try {
  Add-Type -AssemblyName System.Windows.Forms
  Add-Type -AssemblyName System.Drawing

  $safeFeature = $Feature -replace '[\\/:*?"<>|]', '_'
  $evidenceDir = Join-Path -Path (Get-Location) -ChildPath "cypress\evidencias\$safeFeature"

  if (-not (Test-Path -LiteralPath $evidenceDir)) {
    New-Item -ItemType Directory -Path $evidenceDir -Force | Out-Null
  }

  $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds

  if ($null -eq $bounds -or $bounds.Width -le 0 -or $bounds.Height -le 0) {
    Write-Host "Nao foi possivel identificar uma tela valida para captura."
    exit 0
  }

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $outputFile = Join-Path -Path $evidenceDir -ChildPath "manual-capture-$timestamp.png"

  $bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  try {
    $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
    $bitmap.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Evidencia manual salva em: $outputFile"
  }
  finally {
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}
catch {
  Write-Host "Nao foi possivel capturar a tela. Verifique se ha uma sessao grafica ativa no Windows."
  Write-Host "Detalhe: $($_.Exception.Message)"
  exit 0
}
