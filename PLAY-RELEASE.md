# Free release 1.2.0 — Block Block

Package com.lalaolemur.blockblock; version code 3. The release has no ads, purchases, age screen, analytics or tracking SDKs. The merged manifest contains no internet, billing or advertising-ID permission.

Earn one free Tip per three distinct campaign levels completed (3, 6, 9, ... 99). Existing progress counts. Replays and tutorial lessons do not award extra Tips. Tips accumulate locally; spending persists before a trail is shown. Maximum 33 campaign Tips.

The previous monetized implementation is preserved in archive/monetized-version with no passwords or keys. It is not included in Android builds or the public policy site.

Build with android/build-play-release.ps1. Signed bundle: dist/play-upload/BlockBlock-1.2.0.aab. Phone test build: dist/BlockBlock-free-debug.apk. Install the debug APK over the previous debug version to keep its level progress. Old test-ad credits are not used by the new free-Tip balance.

Verification: 150 JavaScript tests pass, including award boundaries, all 100 completions, replay suppression, old progress, spending/reload persistence and storage failure. Browser play through levels 1–3 confirmed the first reward; spending on level 4 and reloading preserved zero remaining Tips. Android release build and lint pass (0 errors, 2 warnings). Bundle signature verified locally. Final device testing and Play upload/review remain outstanding.

Privacy and support pages describe the offline free app. Render publishes github-pages/. Play draft ads declaration is No; sign-in restrictions are No; listing draft describes the free game. Rating, target audience, Data safety, listing graphics/screenshots, signing enrollment and closed testing must still be completed/verified before public release.

Signing keys are local in ignored dist/signing. Run android/backup-signing.ps1 and copy the verified portable backup to a separate secure drive. Play App Signing enrollment has not been completed. To retain independent control, supply the locally generated app-signing key through Google's encrypted export process and use the separate upload key for bundles.

Data safety is saved as a no-collection/no-sharing draft. Google requires target audience before finalizing it; the content-rating flow is waiting for owner approval of IARC terms. No AAB has been uploaded. Updated Render policy verified live.

## Play Console update — October 14, 2026

Owner completed content rating and target audience. Data safety is now saved as a completed declaration: no data collected/shared; Families policy commitment shown. Icon (512x512) and feature graphic (1024x500) uploaded, applied, and saved to the default listing draft. AI labels were applied to both graphics during review. Listing completion is blocked by Google's explicit validation: upload at least two phone or tablet screenshots. The existing project screenshots are browser previews, so none were submitted as Android screenshots. No release upload or public publication was performed in this update.

## Phone screenshots and listing — October 14, 2026

Owner supplied actual Android menu and level-9 screenshots. Originals copied into release-assets/android-screenshots/menu.png and gameplay.png, uploaded to the phone screenshot slots and accepted without alteration. Store listing saved successfully; Console status is Ready to send for review. Dashboard no longer shows unfinished app-information/store-listing setup. Closed testing, signing enrollment and the release upload remain separate next steps; no public release was made.

## Closed test upload — October 14, 2026

Uploaded dist/play-upload/BlockBlock-1.2.0.aab to the existing Closed testing - Alpha release. Google accepted version code 3 / version 1.2.0, target SDK 36, approximately 1.77 MB. Release name: 1.2.0 — Free closed test. Added tester release notes. The only reported validation warning is an absent deobfuscation file; minifyEnabled is false, so there is no project mapping file to upload.

Saved the release and submitted all 15 pending changes for Google review. Console displays Changes in review, with quick checks running and submission to review after successful checks. Existing owner configuration is United States, email tester list Family, feedback lalao.lemur@gmail.com, target audience 9 and older, and Google Play Games on PC opted in. These owner selections were retained.

The test is not yet confirmed live. At least 12 testers must opt in through Google Play and remain opted in for 14 continuous days before the production-access application. Direct APK installation does not count as joining the Play closed test. No public production release has been requested.

## Story release 1.3.0 — October 20, 2026

Version code 4 adds 20 story scenes about Block finding his triangle son, a happy reunion after level 100, and an Our story replay viewer. The approved family artwork with faces and arms is shared by the menu, world scenes, story viewer and ending. Story scenes wait for Continue. Existing levels, saved scores and earned Tips are retained.

Build with android/build-play-release.ps1. The helper reads the version from app/build.gradle, builds in a version-specific output folder and verifies the existing upload signature. Signed bundle: dist/play-upload/BlockBlock-1.3.0.aab. Release notes: release-assets/release-notes-1.3.0.txt.

Verification: 152 JavaScript tests pass; Android bundle build and lint pass (0 errors, 2 existing warnings). The signed bundle's index.html, game.js, story.js, family.svg, style.css, tutorial.js, free-tips.js and progress.js were compared byte for byte with current source. Package com.lalaolemur.blockblock, version code 4, version name 1.3.0 were verified from generated BuildConfig. No story-related permissions or data collection were added.

Play upload and review status must be recorded after confirmation in Play Console. The existing track is Closed testing; production release is not part of this update.
