import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { getMaccabiNetanyaPlayers } from "../../services/api";

export default function PlayersScreen() {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    async function loadPlayers() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPlayerList(data);
    }
    loadPlayers();
  }, []);

  return (
    <View>
      {/* <FlatList
        data={playerList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.position}>{item.position}</Text>
            <Text style={styles.name}>שם: {item.name}</Text>
            <Text style={styles.shirt}>מספר חולצה: {item.shirt}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  playerCard: { alignItems: "center", margin: 10 },
  image: { width: 120, height: 100 },
  position: { fontWeight: "600" },
  name: { fontSize: 16, fontWeight: "700" },
  shirt: { fontSize: 14, fontWeight: "500" },
});
