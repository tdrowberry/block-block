$ErrorActionPreference = 'Stop'
$signingDir = Join-Path $PSScriptRoot '../dist/signing'
$backupDir = Join-Path $PSScriptRoot ('../dist/signing-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
$keytool = Join-Path $env:ProgramFiles 'Android/Android Studio/jbr/bin/keytool.exe'
Write-Host 'Create a portable backup of both Block Block keys. Save this password in your password manager.'
$backupPassword = Read-Host 'Backup password (at least 12 characters)' -AsSecureString
$confirmation = Read-Host 'Repeat backup password' -AsSecureString
$backupText = [Net.NetworkCredential]::new('', $backupPassword).Password
$confirmText = [Net.NetworkCredential]::new('', $confirmation).Password
if ($backupText.Length -lt 12 -or $backupText -cne $confirmText) { throw 'Passwords must match and contain at least 12 characters.' }
New-Item -ItemType Directory -Path $backupDir | Out-Null
try {
    $env:BLOCKBLOCK_BACKUP_PASSWORD = $backupText
    foreach ($purpose in @('app', 'upload')) {
        $alias = "block-block-$purpose"
        $secret = (Get-Content -LiteralPath (Join-Path $signingDir "$alias.password.protected") -Raw).Trim() | ConvertTo-SecureString
        $env:BLOCKBLOCK_SOURCE_PASSWORD = [Net.NetworkCredential]::new('', $secret).Password
        & $keytool -importkeystore -srckeystore (Join-Path $signingDir "$alias.jks") -srcstoretype JKS -srcalias $alias -srcstorepass:env BLOCKBLOCK_SOURCE_PASSWORD -srckeypass:env BLOCKBLOCK_SOURCE_PASSWORD -destkeystore (Join-Path $backupDir "$alias.p12") -deststoretype PKCS12 -deststorepass:env BLOCKBLOCK_BACKUP_PASSWORD -destkeypass:env BLOCKBLOCK_BACKUP_PASSWORD -noprompt
        if ($LASTEXITCODE -ne 0) { throw 'Backup failed. Do not treat the backup folder as complete.' }
        & $keytool -list -keystore (Join-Path $backupDir "$alias.p12") -alias $alias -storepass:env BLOCKBLOCK_BACKUP_PASSWORD
        if ($LASTEXITCODE -ne 0) { throw 'Backup verification failed.' }
    }
    Write-Output "Verified portable backups: $backupDir. Copy this folder to a separate secure drive. Password is not saved here."
} finally {
    Remove-Item Env:BLOCKBLOCK_BACKUP_PASSWORD, Env:BLOCKBLOCK_SOURCE_PASSWORD -ErrorAction SilentlyContinue
    $backupText = $null; $confirmText = $null
}
