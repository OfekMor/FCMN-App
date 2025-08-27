import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PlayerCarousel from "../../components/PlayerCarousel";
import { getMaccabiNetanyaPlayers } from "../../services/api";
import { Player } from "../types/Player";

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const positions = [
    { key: "Goalkeeper", label: "שוערים" },
    { key: "Defender", label: "הגנה" },
    { key: "MidField", label: "קישור" },
    { key: "Forward", label: "התקפה" },
  ];
  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await getMaccabiNetanyaPlayers(); // עכשיו זה fetch מ־Firebase
      setPlayers(data);
    } catch (e) {
      console.warn("Failed loading players:", e);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>טוען שחקנים…</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>סגל שחקנים</Text>
        <View style={styles.header}>
          <TouchableOpacity onPress={loadPlayers} style={styles.refreshBtn}>
            <Text style={styles.refreshText}>רענון</Text>
          </TouchableOpacity>
        </View>

        {positions.map((pos) => {
          const filtered = players.filter((p) => p.position === pos.key);
          if (!filtered.length) return null;
          return (
            <View key={pos.key} style={{ marginBottom: 30 }}>
              <Text style={styles.sectionTitle}>{pos.label}</Text>
              <PlayerCarousel players={filtered} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#130f01ff", paddingTop: 12 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 40,
    fontWeight: "900",
    justifyContent: "center",
  },
  refreshBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFD700",
    borderRadius: 10,
  },
  refreshText: { fontWeight: "700" },
  sectionTitle: {
    color: "#fcde11",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
});
