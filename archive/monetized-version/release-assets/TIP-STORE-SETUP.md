# Tip store — Play Console setup

The app now supports these seven consumable one-time products. Prices below are the intended USD base prices; they are not live prices until configured in Play Console. The app always displays Google's localized price and derives any savings from actual prices in the same currency.

| Product ID | Display name | Tip credits | USD base price | Discount versus $1 per Tip |
| --- | --- | ---: | ---: | ---: |
| tips_1 | 1 Tip | 1 | $1.00 | 0% |
| tips_5 | 5 Tips | 5 | $4.75 | 5% |
| tips_10 | 10 Tips | 10 | $9.00 | 10% |
| tips_20 | 20 Tips | 20 | $16.00 | 20% |
| tips_30 | 30 Tips | 30 | $22.50 | 25% |
| tips_40 | 40 Tips | 40 | $28.00 | 30% |
| tips_50 | 50 Tips | 50 | $30.00 | 40% |

Updated October 13: the owner requested discounts starting at 5% for five Tips and rising to 40% for fifty. Intermediate discounts are 10%, 20%, 25% and 30% for 10, 20, 30 and 40 Tips. A 50-Tip pack saves $20 relative to buying 50 single Tips. Taxes, local currency conversion, price adjustments and Play service fees may affect checkout or developer proceeds; $1 per Tip is a customer base price, not a guaranteed net payout.

## Configure each product

1. In the Block Block app in Play Console, open Monetize with Play → Products → One-time products (names may vary with the Console UI).
2. Create each product using its exact ID above. Keep the existing tips_5 ID if it already exists; its credits remain compatible.
3. Use one standard buy purchase option per product. Set the USD base price, review localized prices/regions, and activate the product and buy option. Do not use subscriptions, rentals, extra offers or multi-quantity purchases for this release without further testing.
4. Suggested description, adjusted for quantity: “50 consumable Tips for Block Block. Each Tip previews up to 20 moves. Credits are stored on this device and are lost after uninstalling or clearing app data. All puzzles can be played without Tips.”
5. Set billingPublicKey in the ignored android/release.properties to the public licensing key shown by Play Console. Never include signing passwords or private keys in the public repository or chat.
6. Upload a signed production-package AAB to internal testing. Install through that track using a Play license tester. The debug APK has a .debug package and cannot test purchases for com.lalaolemur.blockblock.

## Validation before selling

Test all seven quantities, pending/canceled purchases, restart recovery, retry after interrupted consumption, missing products, offline/connection failures and currency-dependent discount labels. A pack remains disabled when Play has not returned its product details. Prices are refreshed when the store opens. No purchase or ad is needed to solve any puzzle.

The app verifies signatures locally and stores the grant plus token before consuming the purchase, preventing duplicate grants on retries. Unknown product IDs, invalid quantities and integer overflow are rejected. A production backend for server verification, refunds/voided-purchase reconciliation and cross-device recovery is still not implemented. The local-wallet limitation is disclosed before checkout and in the support/privacy pages.

Store presentation uses neutral pack choices without countdowns, purchase pressure or preselected expensive packs. Child-directed ad treatment remains unchanged. Parents/guardians are directed to supervise optional purchases and use Google Play's purchase approvals.

Official reference: https://developer.android.com/google/play/billing/integrate
