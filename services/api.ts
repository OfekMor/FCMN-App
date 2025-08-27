// // services/playersApi.js
// const API_URL = "http://192.168.1.179:3000/players";

// export async function getMaccabiNetanyaPlayers() {
//   try {
//     const res = await fetch("http://192.168.1.179:3000/players"); // או נתיב אחר ל־JSON מקומי
//     if (!res.ok) throw new Error("Network error");
//     return await res.json();
//   } catch (err) {
//     console.warn("API fetch failed:", err);
//     return []; // במקרה של כשל מחזיר מערך ריק
//   }
// }
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Player } from "../app/types/Player";

export async function getMaccabiNetanyaPlayers(): Promise<Player[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "players"));
    const players: Player[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "שחקן לא ידוע",
        position: data.position ?? "Unknown",
        playerPosition: data.playerPosition ?? "",
        image: data.image ?? "",
        shirt: data.shirt ?? "",
        state: data.state ?? "IL",
        age: data.age ?? "-",
        playerHeight: data.playerHeight ?? "-",
        games: data.games ?? 0,
        goals: data.goals ?? 0,
        assists: data.assists ?? 0,
        cleanSheet: data.cleanSheet ?? 0,
        peneltyStop: data.peneltyStop ?? 0,
      };
    });
    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}
