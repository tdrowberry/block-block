# Block Block — Lalao Lemur

## Current build

Native Android shell with bundled offline web game, minimum Android 7 (API 24), target SDK 36, Google Play Billing 8.3.0, AdMob rewarded and interstitial ads, and UMP consent. Debug uses Google's sample ad IDs. Production release tasks intentionally fail until `android/release.properties` is configured. No live ads, prices, developer accounts, or store submission have been created by this task.

Provisional package: `com.lalaolemur.blockblock`. Confirm before first Play upload; it becomes the app's permanent identity. Debug adds `.debug` and cannot test purchases for the production package.

## Build and sign

Open `android` in Android Studio with Java 17+ and Android SDK 36. Gradle copies an explicit set of game assets into the app; gameplay does not need a website connection. Run `gradlew.bat assembleDebug` for an installable test APK. Real rewarded ads and Play purchases require network access.

Copy `android/release.properties.example` to `android/release.properties` and fill it in. Run `gradlew.bat bundleRelease` or Android Studio > Generate Signed App Bundle. Command-line release builds now require the upload keystore path and alias in release.properties and the passwords in BLOCKBLOCK_STORE_PASSWORD and BLOCKBLOCK_KEY_PASSWORD environment variables. The release task fails if required account fields or signing inputs are missing; debug builds remain available without them. Keep the upload key/password outside Git and enroll in Play App Signing. Never share signing secrets in chat.

## Required owner setup

1. Create/verify the Lalao Lemur developer identity in Play Console. Create the app, confirm package name and target audience, and provide a support email.
2. Create an AdMob Android app and rewarded ad unit and an interstitial ad unit; configure privacy messages. Replace the test IDs through release.properties. A release aimed at children requires a Families review and child-directed ad configuration before publishing; the current general-audience setup must not be used unchanged.
3. Create the consumable **`tips_5`** one-time product in Play Console, set its localized price and activate its buy option. The UI reads the actual Play price. Add the public licensing key to release.properties. Do not enable multi-quantity purchases unless separately tested.
4. Add support contact to `privacy.html`, review it against the final SDK behavior, and host it at a publicly accessible HTTPS URL. Fill in the same URL in Play Console. Complete Data safety using the current Ads/UMP/Billing disclosures; do not mark the app “collects no data.” Declare ads and in-app purchases.
5. Complete content rating, target audience, app access, store category, screenshots, high-resolution icon, and 1024×500 feature graphic. Capture screenshots from the final app, without test-only balances or claims.
6. Upload a signed AAB to internal testing. Test successful/canceled/pending/refunded purchases, interrupted consumption, app relaunch, no-fill/offline ads, early ad closure, consent rejection/revocation, narrow and landscape layouts, TalkBack, background/resume, and every control mode. Use Play license testers for purchases and test ads on test devices.
7. Fulfill any closed-testing and production-access requirements shown in your Play Console. Publishing requires your developer account, signing, declarations, and review; a locally built APK is not a Play release.

## Tip behavior and limitations

One rewarded ad grants one credit only from the earned-reward callback. Five credits are granted only for a completed, signature-verified purchase; pending/canceled purchases do not grant credits. Grants and processed tokens are saved together before consumption so interrupted callbacks are retried without duplicate credit. Outstanding purchases are queried on startup/resume. Consumed credits are device-local; they are not restored after uninstall, data clearing, or on another device. Disclose this before purchase. A production backend is recommended for cross-device wallets, refund/voided-purchase reconciliation, stronger purchase verification, and AdMob server-side verification.

Spending one credit reveals up to 20 moves from the current block/bridge state. The trail includes numbered footprints and a moving transparent block. Following the trail consumes its displayed steps; deviating, restarting, or changing levels clears it. An unsolvable position is detected before offering a credit spend. The solver and route rendering are tested without charging users or faking an ad reward. Browser tips remain unavailable until a supported store is present.

## Draft store listing

**Title:** Block Block

**Short description:** Roll, resize and teleport through 100 clever block puzzles.

**Description:** A little balance. A little nerve. Guide your block across floating platforms and stand upright on the exit. Explore 100 puzzles featuring size-changing squares, bridges, portals, and fragile tiles. Choose swipe or arrow controls, chase perfect scores, and return to tricky puzzles. Need a nudge? Optional Tips preview up to your next 20 moves. Earn Tips by watching a rewarded ad or purchase a pack through Google Play. Every level is playable without Tips. Contains ads, including an automatic ad after five newly completed levels when available. Created by Lalao Lemur.

## Official references

- https://developer.android.com/google/play/requirements/target-sdk
- https://developer.android.com/google/play/billing/integrate
- https://developers.google.com/admob/android/rewarded
- https://developers.google.com/admob/android/privacy
- https://support.google.com/googleplay/android-developer/answer/9858738

## Verification — October 2, 2026

- All 111 JavaScript tests pass, including all 70 level solutions, the 20-move Tip cap, state-aware routes, and store callback matching.
- Tip trail, step countdown, and deviation clearing verified in an isolated browser QA session with test-only credits, not real ads or money.
- Android debug APK assembled successfully with Gradle 9.5.0 / AGP 9.1.1. Android lint: zero errors; two informational warnings (newer Gradle available and the intentional JavaScript-enabled local game WebView).
- Local test artifact: `dist/BlockBlock-debug.apk` (not committed). Windows output locks required `-PbuildOutput=build-final --no-watch-fs` for the verified build. The optional output override can be used if a local build directory is locked.
- Live Play purchases, AdMob rewards, consent flows, and a physical-device run remain to be tested after the account configuration is supplied. This is not a signed production bundle or a published Play listing.


## October 10 polish and review build

New illustrated home screen, chapter completion counts, mineral tile edges, inset block detailing, updated result cards, saved sound preference, and a one-move input buffer. Keyboard repeat is ignored to prevent unintentional moves. Opening a dialog, leaving a level, falling, or hiding the app clears queued input. Backgrounding pauses roll animation and audio. All 70 boards and score keys remain unchanged.

Automatic ads run only at a natural end-of-level break, before results controls become available. Every fifth first-time completion is eligible, tracked locally across app launches. A preloaded ad is required; no-fill, no consent, background Activity, or recent full-screen ad skips the opportunity without delaying progression. Ads are discarded after 58 minutes. A two-minute cooldown applies after rewarded or automatic ads. The next ad is preloaded after dismissal. Rewarded Tips remain voluntary and grant credit only through Google's reward callback.

### Review materials

- `release-assets/`: desktop and phone browser previews, feature graphic, listing icon, and store listing text. Browser captures are design previews; replace with final Android device captures for submission.
- `dist/BlockBlock-review-debug.apk`: installable debug build using Google test ad IDs; not a Play upload bundle.
- `android/qa/AdCadenceTest.java`: 75 cadence checks, runnable with the installed Java toolchain.

### Owner-dependent release gates

Supply the AdMob application/rewarded/interstitial IDs, public Play Billing licensing key (if selling Tips), HTTPS privacy policy URL, support email, confirmed audience, and upload key configuration. Confirm the package identity before the first upload. Do not paste signing passwords into chat. Review the local-only paid-credit limitation before selling consumables; refunds and cross-device wallets are not implemented.

API 36 is already targeted. Recheck Play Console's current policy deadlines and account-specific testing eligibility at upload time. See [Google's target API requirements](https://developer.android.com/google/play/requirements/target-sdk), [interstitial placement guidance](https://support.google.com/admob/answer/6201350), and [listing asset requirements](https://support.google.com/googleplay/android-developer/answer/9866151).

Device/internal-track testing still required: real consent forms in applicable regions; reward earned/early close/no-fill/offline; completion counts 4→5 and 9→10; replay suppression; backgrounding during ad load; purchase cancel/pending/recovery; cold start; low-end-device frame pacing; and TalkBack. Do not interpret successful local builds as successful live monetization or Play approval.

### Verification — October 10, 2026

- 112 JavaScript tests passed, including all 70 level solutions and the single-move input buffer.
- 75 Java ad-cadence checks passed, covering milestones and the full-screen-ad cooldown boundary.
- Final debug APK assembled successfully. Android lint: 0 errors, 2 warnings (newer Gradle available; intentional JavaScript-enabled bundled WebView).
- Browser checks at desktop, 390×844, 320×640, and 844×390: responsive controls, no landscape board/status overlap, quick consecutive inputs, a five-move perfect finish, next-level unlock, saved progress after reload, and disabled browser-only store buttons. No browser console errors observed.
- Missing production configuration correctly causes `validateRelease` to fail. No signed production AAB was created; no live ads, payments, physical-device checks, upload, or publishing was performed.


## 100-level expansion — version 1.1.0 (version code 2)

Thirty master puzzles bring the campaign to 100 levels and ten chapters. Levels 71–100 have strictly increasing, solver-verified shortest routes: 50, 52, 54, …, 108 moves. Previous boards and score keys are unchanged. The new data is bundled for offline Android and web play; menu totals, minimums, manifest, and listing copy now reflect 100 levels.

Verification: all 146 JavaScript tests pass, including exact shortest routes for every level, required mechanics, Tip paths, and 70-to-100 save migration. All 105 ad-cadence checks pass. Android debug build and lint succeed (0 errors, the same 2 warnings). Level 100 was played through in the browser with 108 real keyboard inputs; its perfect result correctly reports all escapes completed and offers Back to levels.

Latest installer: `dist/BlockBlock-100-levels-debug.apk`. This supersedes the earlier 70-level review installer. Windows held the old build output locked, so the verified build used `-PbuildOutput=build-campaign100 --no-watch-fs`. Account configuration and device/live-monetization release gates above still apply.

See `release-assets/master-campaign.md` for all 30 puzzle names and verified minimums. `level-100-phone.jpg` and `level-100-complete.jpg` are browser QA captures from an isolated test save, not Play Store device screenshots. No progress was seeded into the normal preview or production app.
