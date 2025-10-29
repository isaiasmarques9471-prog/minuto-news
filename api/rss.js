export default async function handler(req, res) {
  try {
    const q = (req.query.q || "Brasil").toString();
    const base = "https://news.google.com/rss/search";
    const params = new URLSearchParams({ q, hl: "pt-BR", gl: "BR", ceid: "BR:pt-419" });
    const url = `${base}?${params.toString()}`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await r.text();

    const blocked = [/sexo/i, /porn/i, /sensual/i, /nudez/i];
    let safe = text;
    if (blocked.some(rx => rx.test(text))) {
      safe = text.replace(/<item>[\s\S]*?<\/item>/gi, (m) => blocked.some(rx=>rx.test(m)) ? "" : m);
    }

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Content-Type","application/rss+xml; charset=utf-8");
    res.status(200).send(safe);
  } catch(e) {
    res.status(500).send("Erro RSS: " + e.message);
  }
}

