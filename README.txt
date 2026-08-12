Bisaya Toolkit Data Proxy

Deploy api/data.js into the SAME Vercel project currently using:
https://image-rho-puce-14.vercel.app

Then add the required Environment Variables in Vercel:
BT_MAPS_URL
BT_SKINS_URL
BT_HERO_STATS_URL
BT_SUGGESTED_URL
BT_CUSTOM_SKINS_URL
BT_MEME_SKINS_URL
BT_ITEM_ICONS_URL
BT_BATTLE_EFFECTS_URL
BT_HERO_SKILLS_URL
BT_HERO_DETAILS_URL
BT_SKIN_UPGRADES_URL
BT_COMBOS_MATCHUPS_URL
BT_HERO_BUILDS_URL
BT_HERO_MATCHUPS_URL

Set each value to its original JSON source URL.
Do NOT commit those values to a public GitHub repository.

After adding variables, redeploy the Vercel project.
The Android app will only contain URLs like:
/api/data?key=hero_stats
and will no longer contain the original JSON source URLs.
