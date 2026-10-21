# Block Block publication readiness — October 13, 2026

This is a working submission worksheet, not a completed legal certification. Public pages are hosted on Render. Account declarations, store upload and acceptance of terms remain outstanding.

## App changes prepared

- Privacy policy covers local saves and wallet records, AdMob/UMP, Google Play purchases, security, retention, deletion and support correspondence.
- Privacy and purchase-support pages are accessible from both the menu and Settings, and bundled for offline Android use.
- Help explains device-local consumable credits, pending payments, purchase recovery, Google Play refund requests and applicable consumer rights.
- Ad privacy changes discard preloaded interstitials and invalidate older load callbacks before requesting fresh ads.
- Android release builds require valid public contact and policy details. The owner confirmed a mixed child-and-older audience; release validation requires targetAudience=mixed. A neutral age range is selected and stored locally. Child ad treatment, a G content cap and under-age UMP treatment apply to everyone; advertising-ID and ad-services permissions are removed.
- The existing “Built with AI assistance” credit remains. The app does not offer a generative AI feature to players.

## Configure the public pages

Hosting is now live on Render. The policy at https://block-block-kdss.onrender.com/privacy.html and support page at https://block-block-kdss.onrender.com/support.html were verified in the browser on October 13, 2026, including the support email and working links between pages. Android release configuration and its example use this Render URL. The earlier GitHub Pages plan below is superseded; the public site is served from github-pages/ in tdrowberry/block-block.

Set supportEmail and privacyPolicyUrl in the ignored android/release.properties file. Use an email you monitor and the exact public HTTPS address of privacy.html.

From android/, run gradlew.bat preparePublicPolicy. This exports only privacy.html, support.html and policy.css to dist/privacy-policy, with the public contact injected and the pre-release notices removed. Upload those three files together to your chosen static host. Open the public privacy URL without logging in, and verify both pages, their links and the support email. The export does not publish anything. Do not upload the repository or release.properties to a public host.

Android builds use the same contact substitution for their bundled pages. If only one of the contact fields is configured, the pre-release notices remain. Production validation rejects missing details. Source previews retain a notice until owner details are supplied.

## Data safety worksheet

Review these against the final release and AdMob account configuration before entering answers. SDK behavior counts even though the game has no save server. Do not answer “no data collected” for an ad-enabled build.

| Component | Data / behavior | Declaration to review |
| --- | --- | --- |
| Game saves | Age range, level progress, scores and preferences stay on device | Local-only processing is generally outside off-device collection; check current form definitions. |
| Local wallet | Credits, completion count and processed purchase tokens in app-private preferences | No developer wallet server. Google Play still processes purchases. |
| Mobile Ads 25.5.0 | Child-directed contextual ads: IP-derived approximate location, app interactions, diagnostics and permitted identifiers such as app set ID. No AAID/ad-services permissions. | Review approximate location, app interactions, diagnostics and device/other IDs; advertising, analytics and fraud prevention purposes. |
| UMP 4.0.0 | Under-age treatment for all players, consent update requests and any available privacy choices | Review the current SDK and configured messages; do not omit consent-service activity. |
| Billing 8.3.0 | Play handles payment; app reads purchase records and consumes purchased credits | Review purchase history and service-provider treatment using current Play definitions. The developer does not receive card numbers. |
| Support email | Email address and information the player chooses to send | Disclose in policy; review whether this off-app support channel belongs in the form. Configure the mailbox retention and deletion practice to match the published policy. |

Google states that Mobile Ads data is encrypted in transit using TLS. Verify other included services and any future SDKs before answering the app-wide encryption question. Local clearing does not delete Google-held records. There is no game account, so do not claim an account-deletion feature is present or required solely because Google Play is used.

References:
- https://developers.google.com/admob/android/privacy/play-data-disclosure
- https://developers.google.com/admob/android/privacy
- https://support.google.com/googleplay/android-developer/answer/10144311
- https://support.google.com/googleplay/android-developer/answer/10787469

## Owner and account requirements still open

1. Owner confirmed children under 13 and older players. Declare the actual intended age bands truthfully and complete Families review. The app stores a neutral age-range choice locally and applies child ad protections to every player. AdMob 25.5.0 is within the listed self-certified versions (19.0.0+); do not add unapproved mediation partners. Verify actual ad creative, dismissal timing and data behavior on devices.
2. Support email and Render hosting are configured. Monitor the mailbox and keep correspondence retention consistent with the policy.
3. Configure AdMob app, rewarded and interstitial IDs and relevant regional privacy messages. Check ad content settings against the game's rating. Use test ads/test devices during QA.
4. Create all seven products (tips_1, tips_5, tips_10, tips_20, tips_30, tips_40, tips_50), prices and buy options in Play Console; supply the public licensing key. Do not share signing passwords in chat. Confirm package com.lalaolemur.blockblock before first upload.
5. Separate app-signing and upload keys are generated in ignored dist/signing. Run android/backup-signing.ps1 and copy the verified portable backup to a separate secure drive. Play enrollment is still required.
6. Complete content rating, target audience, ads and all applicable App content declarations. App access: no game login, every puzzle playable without payment, sequential unlocks. Include instructions if reviewers need them.
7. Capture at least two screenshots from the final Android app and use the prepared icon/feature graphic. Browser preview images are not final Android captures.
8. Run internal-track/device tests and any account-specific closed test requirements before requesting production access.

## Purchase and consent test record — not yet run live

Record device, Android version, release version, date and result for each case:

- First-run age dialog has no selected answer, all ranges allow the same game, selection persists locally and services start afterward. All ranges receive child-treated, G-capped ads. UMP receives under-age treatment, so a personalized-ad consent form is normally unnecessary. Check privacy controls and any available forms. Ads loaded before a privacy change must not be displayed afterward.
- Rewarded ad: reward earned once, early close grants none, no-fill/offline is handled, background/resume is safe.
- Automatic ads: new completions 4→5 and 9→10, replay suppression, cooldown, no-fill, background/resume.
- Play license tester: successful payment, cancel, pending payment later completed, interrupted grant/consumption and recovery after restart without duplicate credit.
- Refund request and support handling. The app has no server-driven voided-purchase reconciliation or cross-device wallet; consumed credits are not recovered after data clearing. Disclosures do not replace consumer rights.
- Cold start/offline play, narrow and landscape layouts, low-end-device performance, back navigation, TalkBack and every control mode.

## Rights and export review — not yet cleared

Keep records of sources and commercial-use permissions for name, icon, hero artwork, feature graphic, sounds, code and levels. Check required dependency notices. No trademark clearance for “Block Block” or “Lalao Lemur” has been completed. AI assistance disclosure is not a rights clearance; keep records of human creative contributions and AI tool terms. Review actual encryption use (including libraries/SDKs) and applicable export classification before making the export certification.

The browser game uses local vector artwork and generated audio; that observation alone does not establish provenance or exclude third-party rights. Do not mark these checks complete without evidence.

References:
- https://support.google.com/googleplay/android-developer/answer/9888072
- https://support.google.com/googleplay/android-developer/answer/113770
- https://www.copyright.gov/ai/

## Local verification — October 13

150 game tests, 105 ad-cadence checks and 28 Tip catalog checks pass. Android debug build and lint pass with 0 errors and 2 warnings. Privacy/support pages are live on Render. Tutorial and store browser checks were completed in the prior implementation pass. Latest installer: dist/BlockBlock-publish-check-debug.apk, using sample ads and configured contact details.

Production validation intentionally stops at missing AdMob configuration. No production AAB or Play upload exists. No Android device is currently available to the testing tools. Real Play billing, final ad-account setup, final Android screenshots, rights review and export certification remain outstanding.