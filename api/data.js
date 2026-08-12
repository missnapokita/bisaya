export default async function handler(req, res) {
  const key = Array.isArray(req.query.key) ? req.query.key[0] : req.query.key;

  const sources = {
    "maps": process.env.BT_MAPS_URL,
    "all_skins": process.env.BT_SKINS_URL,
    "hero_stats": process.env.BT_HERO_STATS_URL,
    "suggested": process.env.BT_SUGGESTED_URL,
    "custom_skins": process.env.BT_CUSTOM_SKINS_URL,
    "meme_skins": process.env.BT_MEME_SKINS_URL,
    "item_icons": process.env.BT_ITEM_ICONS_URL,
    "battle_effects": process.env.BT_BATTLE_EFFECTS_URL,
    "hero_skills": process.env.BT_HERO_SKILLS_URL,
    "hero_details": process.env.BT_HERO_DETAILS_URL,
    "skin_upgrades": process.env.BT_SKIN_UPGRADES_URL,
    "combos_matchups": process.env.BT_COMBOS_MATCHUPS_URL,
    "hero_builds": process.env.BT_HERO_BUILDS_URL,
    "hero_matchups": process.env.BT_HERO_MATCHUPS_URL
  };

  if (!key || !Object.prototype.hasOwnProperty.call(sources, key)) {
    return res.status(404).json({ error: "Unknown data key" });
  }

  const upstream = sources[key];

  if (!upstream) {
    return res.status(500).json({ error: "Missing server environment variable for this key" });
  }

  try {
    const response = await fetch(upstream, {
      redirect: "follow",
      headers: {
        "User-Agent": "BisayaToolkit-DataProxy/1.0",
        "Accept": "application/json,text/plain,*/*"
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Upstream request failed",
        status: response.status
      });
    }

    const body = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600"
    );
    res.setHeader("CDN-Cache-Control", "public, max-age=300");

    return res.status(200).send(Buffer.from(body));
  } catch (error) {
    return res.status(502).json({ error: "Data proxy failed" });
  }
}
