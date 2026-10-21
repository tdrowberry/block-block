$ErrorActionPreference = 'Stop'
# Local Windows-user protection. Never print or commit passwords or private keys.
$signingDir = Join-Path $PSScriptRoot '../dist/signing'
$keytool = Join-Path $env:ProgramFiles 'Android/Android Studio/jbr/bin/keytool.exe'
if (!(Test-Path -LiteralPath $keytool)) { throw 'Android Studio keytool was not found.' }
New-Item -ItemType Directory -Force -Path $signingDir | Out-Null
foreach ($purpose in @('app', 'upload')) {
    $alias = "block-block-$purpose"
    $store = Join-Path $signingDir "$alias.jks"
    $secretFile = Join-Path $signingDir "$alias.password.protected"
    if ((Test-Path -LiteralPath $store) -or (Test-Path -LiteralPath $secretFile)) {
        if (!(Test-Path -LiteralPath $store) -or !(Test-Path -LiteralPath $secretFile)) {
            throw "Incomplete signing setup for $alias. Preserve the existing files and repair manually."
        }
        Write-Output "$alias already exists; preserved."
        continue
    }
    $bytes = New-Object byte[] 32
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
    $password = [Convert]::ToBase64String($bytes)
    ConvertFrom-SecureString (ConvertTo-SecureString $password -AsPlainText -Force) | Set-Content -LiteralPath $secretFile
    try {
        $env:BLOCKBLOCK_KEYTOOL_PASSWORD = $password
        & $keytool -genkeypair -keystore $store -storetype JKS -alias $alias -keyalg RSA -keysize 4096 -validity 10000 -dname 'CN=Lalao Lemur' -storepass:env BLOCKBLOCK_KEYTOOL_PASSWORD -keypass:env BLOCKBLOCK_KEYTOOL_PASSWORD
        if ($LASTEXITCODE -ne 0) { throw 'Key generation failed; preserve the protected password for recovery.' }
        & $keytool -exportcert -rfc -keystore $store -alias $alias -storepass:env BLOCKBLOCK_KEYTOOL_PASSWORD -file (Join-Path $signingDir "$alias-certificate.pem")
        if ($LASTEXITCODE -ne 0) { throw 'Certificate export failed.' }
    } finally {
        Remove-Item Env:BLOCKBLOCK_KEYTOOL_PASSWORD -ErrorAction SilentlyContinue
        $password = $null
    }
}
Write-Output 'Keys are protected for this Windows user. Run backup-signing.ps1 and copy its backup to a separate secure drive before enrollment.'
