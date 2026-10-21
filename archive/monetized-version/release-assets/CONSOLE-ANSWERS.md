# Block Block — Google Play setup worksheet

Prepared October 13, 2026. These are app facts for entering the Console forms, not submitted declarations or a guarantee of approval. Review the exact question before choosing its answer.

## Store details

- Name: Block Block
- Package: com.lalaolemur.blockblock
- Developer brand: Lalao Lemur
- Type/category: Game / Puzzle
- Intended distribution: free download with ads and optional consumable purchases
- Support email: lalao.lemur@gmail.com
- Website: https://block-block-kdss.onrender.com/
- Privacy policy: https://block-block-kdss.onrender.com/privacy.html
- Listing text: store-listing.txt
- Icon: play-icon-512.png (512 × 512)
- Feature graphic: feature-graphic.png (1024 × 500)
- Screenshots: still need final Android captures. Existing JPGs are browser review previews.

## App access / reviewer instructions

No app account, login or subscription is required. On first launch, choose an age range; every range receives the same game and child-directed ads. Choose Learn to play or Skip to level 1. Complete each puzzle to unlock the next. Replay the tutorial from the menu or How to play. All 100 puzzles can be completed without buying Tips or watching rewarded ads. Tips are optional. The Tip store requires Google Play and an internet connection. Privacy and support are available from the menu and Settings.

## Content facts

- Contains ads: Yes. Voluntary rewarded ads and occasional interstitials between newly completed puzzles.
- Purchases: Yes, consumable Tip packs. No subscriptions, paid randomized rewards, loot boxes or gambling.
- Intended audience: children under 13 and older players, as confirmed by the owner. Choose the specific Console age bands that accurately describe the game's design; do not treat “all ages” as proof it is developmentally suitable for every preschool age.
- No player chat, user posts, photo sharing, user-generated content, dating, health services, financial services, news, government affiliation or real-world prizes.
- No violence, sexual content, strong language, drugs or simulated gambling in the game content. Ads are configured for child treatment and G-rated content. Complete the rating questionnaire; the rating authority assigns the result.
- The game was made with AI assistance, but does not generate AI content for players.
- No app account creation; no developer account-deletion flow is needed for a nonexistent game account.

## Data safety

Do not select “no data collected.” Follow policy-readiness.md using the final SDKs and account configuration. Ad SDKs can send IP-derived approximate location, interactions, diagnostics and permitted identifiers. Google Play processes purchases. Local saves and the age-range choice remain on the device. No card numbers are received by the game. Clearing local data does not delete Google-held records.

## Seven one-time products

Use exact IDs and the USD base prices in TIP-STORE-SETUP.md. Products must be configured and activated separately in Play Console. Add the public licensing key to android/release.properties. Do not paste private keys or signing passwords into chat.

## Signing and first release

Two separate 4096-bit RSA keys are generated locally in ignored dist/signing: an app signing key and an upload key. Their passwords are encrypted for this Windows user. These files are not portable backups: run android/backup-signing.ps1, choose a password, and copy the verified backup to a separate secure drive.

To retain control of the app signing key, choose the Play App Signing option to supply your own key and follow Google's PEPK encrypted export instructions. Use block-block-app.jks for that process. Use block-block-upload.jks to sign upload bundles. Do not substitute either key after enrollment without the appropriate Play key-change process. Creating keys locally does not enroll them in Google Play or accept its terms.

After real AdMob IDs and the licensing key are configured, run android/build-play-release.ps1. Upload the resulting AAB to internal testing, configure license testers, and install through Play. Run the purchase/ad cases in policy-readiness.md before proceeding. Check the pre-launch report and all Console errors.

The dashboard requires closed testing and production access. For applicable new personal accounts, Google currently requires at least 12 testers continuously opted in for 14 days; complete meaningful testing and apply for production access afterward. Do not invent testing results.

## Remaining owner facts

The owner must provide any required identity, payments/tax details and distribution-country decisions in Google. Review rights/provenance and export certifications before accepting them. No account terms or legal certifications have been accepted by this preparation.

References:
- https://support.google.com/googleplay/android-developer/answer/9842756
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://developers.google.com/admob/android/privacy/play-data-disclosure
