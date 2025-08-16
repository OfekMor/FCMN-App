import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import PlayerCarousel from "../../components/PlayerCarousel";
import { getMaccabiNetanyaPlayers } from "../../services/api";
import { ScrollView } from "react-native";

export default function PlayerScreen() {
  const [players, setPlayers] = useState([]);
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
      const data = await getMaccabiNetanyaPlayers();
      setPlayers(data);
    } catch (e) {
      console.warn("Failed loading players:", e);
      setPlayers([]); // או placeholder
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
        <Text style={styles.title}> סגל שחקנים</Text>
        <View style={styles.header}>
          <TouchableOpacity onPress={loadPlayers} style={styles.refreshBtn}>
            <Text style={styles.refreshText}>רענון</Text>
          </TouchableOpacity>
        </View>

        {positions.map((pos) => {
          const filtered = players.filter((p) => p.position === pos.key);
          if (!filtered.length) return null;
          return (
            <View>
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
  container: { flex: 1, backgroundColor: "#000000ff", paddingTop: 12 },
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
    fontFamily: "RubikDoodleShadow",
    fontSize: 40,
    fontWeight: 700,
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
