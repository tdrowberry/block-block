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

Play Console accepted version code 4 / version 1.3.0 and saved “1.3.0 — Every shape belongs” to Closed testing - Alpha. Publishing overview showed one change not yet submitted for review, with quick checks running. The only release validation warning was a missing optional deobfuscation file; minifyEnabled is false. No review submission or public production release was performed. The owner took over Chrome to finish submission. Updated store description text is prepared in release-assets/store-listing.txt but was not applied in Play Console. The existing live closed test remains version 1.2.0 until the new release is reviewed and rolled out.

Signed 1.3.0 bundle SHA-256: 5662ba9f82ea05c595113a4681cb57dd58a95708aafaf4da8214961b78c8e6ca. Source release pushed to origin/main at 6dedd2c.

## Scene replay release 1.3.1 — October 20, 2026

The owner reports 1.3.0 is now in review. Version 1.3.1 (version code 5) adds Scene buttons to reached world-opening levels, an ending replay on completed level 100, and Story line beside Settings. The story viewer starts at the beginning and permits navigation through unlocked scenes only.

Signed upload file: dist/play-upload/BlockBlock-1.3.1.aab. Release notes: release-assets/release-notes-1.3.1.txt. Android build, signature verification and lint passed (0 errors, 2 existing warnings). Core game, HTML, CSS, story and artwork assets match current source byte for byte inside the bundle. The JavaScript suite has 152 passing tests; additional scene-control checks covered fresh, partial and completed progress. SHA-256: 5951390bedb2e269749ebb7bbf87b3f0f9aea2e17876a4e92b643619aca2a8fb.

This bundle is prepared locally and has not been uploaded. Use the existing Closed testing - Alpha track and tester list. Once the outstanding release is published, create a new release, upload version code 5, add the prepared notes, review and save, then submit from Publishing overview. With managed publishing enabled, publish approved changes explicitly. Verify version 1.3.1 is available to testers and test an update from the Play Store using an enrolled account. Keep testers enrolled; no new test or reinstall is needed.

## Animated story release 1.4.0 — October 21, 2026

Version code 6 replaces static story cards with 21 animated, captioned clips. Characters move and gesture through world settings, leave notes, follow clues and reunite at home. World intros play the matching clip; level Scene buttons replay it. Story line plays all unlocked scenes continuously, and completing level 100 automatically shows the reunion and unlocks the full movie (about 7 minutes 34 seconds). Pause, replay, next-caption and scene navigation are supported. Hidden pages freeze playback, and reduced-motion preferences suppress character motion. Captions provide all dialogue; no voice or network video downloads are required.

Signed bundle: dist/play-upload/BlockBlock-1.4.0.aab. Release notes: release-assets/release-notes-1.4.0.txt. This bundle has not been uploaded to Play Console. Use it for the next release on the existing Closed testing - Alpha track. Source and web game share the same animation code and scene data.

Verification: 155 JavaScript tests pass. Browser checks rendered every clip, verified pause/resume and caption seeking, checked phone layout, confirmed continuous playback and preservation of progress, then solved level 100 through the actual game controls to verify the ending and full-movie unlock. Android release build, signature verification and lint passed (0 errors, 2 existing warnings). Packaged game.js, index.html, style.css, cutscenes.js, film-player.js, story.js and family.svg match current source byte for byte. SHA-256: 067712360fc1950dd8f106a399b87d0e2958884bbeb845f8767ada49cdcaefd7.

An opening video preview is available locally at dist/BlockBlock-animated-opening.webm. STORY.md contains the captioned screenplay.
