// Clima de Fortaleza via Open-Meteo (sem chave); retorna JSON enxuto
export default async function handler(req, res) {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-3.7319&longitude=-38.5267&current=temperature_2m,weather_code,wind_speed_10m";
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const j = await r.json();
    const temp = Math.round(j?.current?.temperature_2m ?? 0);
    const wind = Math.round(j?.current?.wind_speed_10m ?? 0);
    const code = j?.current?.weather_code ?? 0;
    const descMap = {0:"Céu limpo",1:"Principalmente limpo",2:"Parcialmente nublado",3:"Nublado",45:"Nevoeiro",48:"Nevoeiro",51:"Garoa leve",53:"Garoa",55:"Garoa forte",61:"Chuva fraca",63:"Chuva",65:"Chuva forte",80:"Aguaceiros",81:"Aguaceiros",82:"Aguaceiros fortes"};
    const desc = descMap[code] || "Tempo estável";
    res.setHeader("Access-Control-Allow-Origin","*");
    res.status(200).json({ temp, wind, desc });
  } catch (e) {
    res.status(200).json({ temp: null, wind: null, desc: "indisponível" });
  }
}
