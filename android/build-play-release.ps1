$ErrorActionPreference = 'Stop'
$appBuildText = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'app/build.gradle') -Raw
if ($appBuildText -notmatch "versionName '([0-9]+\.[0-9]+\.[0-9]+)'") {
    throw 'Could not read the release version from app/build.gradle.'
}
$releaseVersion = $Matches[1]
$buildOutputName = "build-play-release-$releaseVersion"
# Uses the locally generated upload key. Production validation rejects missing account settings.
$configPath = Join-Path $PSScriptRoot 'release.properties'
$configText = Get-Content -LiteralPath $configPath -Raw
if ($configText -notmatch '(?m)^uploadStoreFile=../dist/signing/block-block-upload.jks\s*$' -or $configText -notmatch '(?m)^uploadKeyAlias=block-block-upload\s*$') {
    throw 'This helper requires the locally managed Block Block upload key settings. Use your existing signing workflow for another key.'
}
$secret = (Get-Content -LiteralPath (Join-Path $PSScriptRoot '../dist/signing/block-block-upload.password.protected') -Raw).Trim() | ConvertTo-SecureString
$previousStorePassword = $env:BLOCKBLOCK_STORE_PASSWORD
$previousKeyPassword = $env:BLOCKBLOCK_KEY_PASSWORD
$previousJava = $env:JAVA_HOME
$previousAndroid = $env:ANDROID_HOME
try {
    $env:BLOCKBLOCK_STORE_PASSWORD = [Net.NetworkCredential]::new('', $secret).Password
    $env:BLOCKBLOCK_KEY_PASSWORD = $env:BLOCKBLOCK_STORE_PASSWORD
    $env:JAVA_HOME = Join-Path $env:ProgramFiles 'Android/Android Studio/jbr'
    $env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android/Sdk'
    Push-Location $PSScriptRoot
    try {
        & ./gradlew.bat bundleRelease lintRelease "-PbuildOutput=$buildOutputName" --no-watch-fs --console=plain
        if ($LASTEXITCODE -ne 0) { throw 'Release validation/build failed; no upload file was copied.' }
        $bundle = Join-Path $PSScriptRoot "app/$buildOutputName/outputs/bundle/release/app-release.aab"
        & (Join-Path $env:JAVA_HOME 'bin/jarsigner.exe') -verify $bundle
        if ($LASTEXITCODE -ne 0) { throw 'Bundle signature verification failed.' }
        $uploadDir = Join-Path $PSScriptRoot '../dist/play-upload'
        New-Item -ItemType Directory -Force -Path $uploadDir | Out-Null
        Copy-Item -LiteralPath $bundle -Destination (Join-Path $uploadDir "BlockBlock-$releaseVersion.aab")
        Write-Output 'Signed bundle prepared in dist/play-upload. Install through Play internal testing before production.'
    } finally { Pop-Location }
} finally {
    $env:BLOCKBLOCK_STORE_PASSWORD = $previousStorePassword
    $env:BLOCKBLOCK_KEY_PASSWORD = $previousKeyPassword
    $env:JAVA_HOME = $previousJava
    $env:ANDROID_HOME = $previousAndroid
}
