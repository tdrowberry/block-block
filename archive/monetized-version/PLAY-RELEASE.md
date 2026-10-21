# Block Block — release status

Updated October 13, 2026. Package: `com.lalaolemur.blockblock`. Version: 1.1.0 (code 2).

## Prepared

- 100 puzzles, optional interactive tutorial, and seven consumable Tip packs.
- Child-directed, G-rated ad requests for every age group; neutral local age-range selection.
- Privacy and support pages hosted on Render, with lalao.lemur@gmail.com.
- Listing text, 512 × 512 icon, 1024 × 500 feature graphic, Console answer worksheet and product prices.
- Separate local app-signing and upload keys; protected passwords excluded from Git.
- Release checks reject wrong package identity, malformed/sample ad IDs, duplicate ad units, invalid billing keys and missing signing/contact settings.

## Still required before a release

1. Signed-in Play Console and AdMob access. Configure real app/rewarded/interstitial IDs in `android/release.properties`.
2. Configure the seven products and prices in `release-assets/TIP-STORE-SETUP.md`; provide the public licensing key.
3. Run `android/backup-signing.ps1` and store its verified portable backup on a separate secure drive. Passwords are currently protected for this Windows account; copying only the protected password files to another computer will not work.
4. Enroll the locally retained app-signing key in Play App Signing using Google's encrypted key-export instructions. Use the separate upload key for bundles. No enrollment or terms acceptance has occurred.
5. Run `android/build-play-release.ps1` after configuring the account values. It validates, builds, checks lint and verifies the signed bundle before copying it to `dist/play-upload/BlockBlock-1.1.0.aab`.
6. Capture final Android screenshots. Existing browser JPGs are review previews only.
7. Enter accurate app-content, rating, Families and Data safety declarations. Use `release-assets/CONSOLE-ANSWERS.md` and `policy-readiness.md`.
8. Install through Play internal testing with license testers; test all purchase packs, cancel/pending/recovery flows and ad behavior. Address the pre-launch report. Complete the closed test and production-access application required by the dashboard.

No signed production bundle has been built, uploaded or published. Account configuration and live transaction testing remain incomplete. Local verification cannot certify trademark/asset rights or export compliance.

## Current verification

150 JavaScript tests pass. Android debug assembly and lint succeed: 0 errors, 2 warnings (Gradle update and intentional local WebView JavaScript). The app has no packaged native libraries in this build. Native Tip catalog and ad cadence tests cover credit quantities and ad timing. Final device screenshots and internal-track purchases remain outstanding.

Latest prepared phone installer: `dist/BlockBlock-publish-check-debug.apk`. This has a `.debug` package and sample ads; it cannot test the production Play products. Do not upload it as the release.

## Purchase behavior

Packs grant 1, 5, 10, 20, 30, 40 or 50 Tips only for completed, locally signature-verified purchases. Pending/canceled purchases grant none. Wallet changes and processed tokens are saved together before consumption, preventing duplicate credit during recovery. One earned rewarded ad grants one Tip. A Tip previews up to 20 moves.

Prices come from Play; discounts derive from actual same-currency single-Tip pricing. Credits are device-local, with no cross-device restoration after uninstall or clearing data. Server verification and refund/voided-purchase reconciliation are not implemented. These limitations require operational consideration before selling; disclosures do not replace consumer rights.

## Public pages

- https://block-block-kdss.onrender.com/privacy.html
- https://block-block-kdss.onrender.com/support.html

Render serves `github-pages/` from `tdrowberry/block-block`. This supersedes the earlier separate GitHub Pages plan. `gradlew.bat preparePublicPolicy` exports the configured source pages to `dist/privacy-policy`; it does not publish them.

## References

- https://support.google.com/googleplay/android-developer/answer/9842756
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://developer.android.com/google/play/billing/security
- https://developers.google.com/admob/android/privacy/play-data-disclosure
