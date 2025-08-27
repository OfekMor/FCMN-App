import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Fixture, getUpcomingMatchesByTeam } from "../../api/footballApi";

type Team = { id: number; name: string; logo: string };

export default function HomeScreen() {
  const [matches, setMatches] = useState<Fixture[]>([]);
  const [nextMatch, setNextMatch] = useState<Fixture | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    async function fetchMatches() {
      try {
        const { nextMatch, allMatches } = await getUpcomingMatchesByTeam(
          "Netanya"
        );
        setNextMatch(nextMatch);
        setMatches(allMatches);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMatches();
  }, []);

  // טיימר למשחק הקרוב
  useEffect(() => {
    if (!nextMatch) return;
    const matchDate = new Date(nextMatch.fixture.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = matchDate - now;
      if (distance <= 0) {
        setCountdown("המשחק התחיל!");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${days} ימים ${hours} שעות ${minutes} דקות`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMatch]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/MaccabiNetanyaLogo.png")}
          style={styles.teamLogo}
        />
        <Text style={styles.teamName}>מכבי נתניה</Text>
      </View>

      {/* משחק הקרוב */}
      {nextMatch && (
        <View style={styles.nextMatchBox}>
          <Text style={styles.sectionTitle}>⚽ המשחק הקרוב</Text>
          <View style={styles.teamsRow}>
            <View style={styles.teamBox}>
              <Image
                source={{ uri: nextMatch.teams.home.logo }}
                style={styles.logo}
              />
              <Text style={styles.teamNameSmall}>
                {nextMatch.teams.home.name}
              </Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.teamBox}>
              <Image
                source={{ uri: nextMatch.teams.away.logo }}
                style={styles.logo}
              />
              <Text style={styles.teamNameSmall}>
                {nextMatch.teams.away.name}
              </Text>
            </View>
          </View>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}

      {/* סטטיסטיקות הקבוצה */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 סטטיסטיקות הקבוצה</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>ניצחונות</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>תיקו</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>הפסדים</Text>
          </View>
        </View>
      </View>

      {/* משחקים קרובים */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>📅 משחקים קרובים</Text>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.fixture.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.matchItem}>
              <View style={styles.matchTeams}>
                <Image
                  source={{ uri: item.teams.home.logo }}
                  style={styles.smallLogo}
                />
                <Text style={styles.matchText}>{item.teams.home.name}</Text>
                <Text style={styles.vsSmall}>vs</Text>
                <Text style={styles.matchText}>{item.teams.away.name}</Text>
                <Image
                  source={{ uri: item.teams.away.logo }}
                  style={styles.smallLogo}
                />
              </View>
              <Text style={styles.matchDate}>
                {new Date(item.fixture.date).toLocaleDateString("he-IL", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          )}
        />
      </View>

      {/* חדשות / כתבות */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>📰 חדשות ומאמרים</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.newsCard}>
              <Image
                source={require("../../assets/images/placeholder.png")}
                style={styles.newsImage}
              />
              <Text style={styles.newsTitle}>כותרת כתבה {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  teamLogo: { width: 100, height: 100, resizeMode: "contain" },
  teamName: { color: "#FFD700", fontSize: 28, fontWeight: "bold" },
  nextMatchBox: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  teamsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamBox: { alignItems: "center", flex: 1 },
  logo: { width: 60, height: 60, marginBottom: 6 },
  teamNameSmall: { color: "#fff", fontSize: 14, textAlign: "center" },
  vsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginHorizontal: 10,
  },
  countdown: {
    fontSize: 16,
    color: "#FFD700",
    marginTop: 10,
    textAlign: "center",
  },
  statsSection: { marginTop: 10 },
  statsContainer: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    flex: 1,
    backgroundColor: "#111",
    marginHorizontal: 5,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#FFD700" },
  statLabel: { color: "#fff", marginTop: 6 },
  matchItem: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  matchTeams: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallLogo: { width: 30, height: 30 },
  matchText: { color: "#fff", fontSize: 14 },
  vsSmall: { color: "#FFD700", fontWeight: "bold" },
  matchDate: { color: "#ccc", fontSize: 12, marginTop: 6, textAlign: "center" },
  newsCard: {
    width: 180,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  newsImage: { width: "100%", height: 100 },
  newsTitle: { color: "#fff", padding: 8, fontWeight: "bold" },
});
