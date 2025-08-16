// services/playersApi.js
const API_URL = "http://192.168.1.179:3000/players";

export async function getMaccabiNetanyaPlayers() {
  try {
    const res = await fetch("http://192.168.1.179:3000/players"); // או נתיב אחר ל־JSON מקומי
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (err) {
    console.warn("API fetch failed:", err);
    return []; // במקרה של כשל מחזיר מערך ריק
  }
}
