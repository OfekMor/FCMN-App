// PlayerManager.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { Country, countries } from "../types/Countries";
import { Player } from "../types/Player";
// מיקומים

export default function PlayerManager() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [positionDropdownOpen, setPositionDropdownOpen] = useState(false);

  // שדות חדשים
  const [name, setName] = useState("");
  const [shirt, setShirt] = useState("");
  const [state, setState] = useState<Country>(countries[0]);
  const [playerPosition, setPlayerPosition] = useState(positions[0]);
  const [age, setAge] = useState("");
  const [playerHeight, setPlayerHeight] = useState("");
  const [games, setGames] = useState("");
  const [cleanSheet, setCleanSheet] = useState("");
  const [peneltyStop, setPeneltyStop] = useState("");
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");

  // פונקציית שמירה
  const handleSave = () => {
    const player: Player = {
      id: editingId ?? Date.now().toString(),
      name,
      shirt,
      state: state.code,
      playerPosition,
      age: age ? Number(age) : undefined,
      playerHeight,
      games: games ? Number(games) : undefined,
      cleanSheet: cleanSheet ? Number(cleanSheet) : undefined,
      peneltyStop: peneltyStop ? Number(peneltyStop) : undefined,
      goals: goals ? Number(goals) : undefined,
      assists: assists ? Number(assists) : undefined,
    };

    if (editingId) {
      setPlayers((prev) => prev.map((p) => (p.id === editingId ? player : p)));
      setEditingId(null);
    } else {
      setPlayers((prev) => [...prev, player]);
    }

    // איפוס השדות
    setName("");
    setShirt("");
    setState(countries[0]);
    setPlayerPosition(positions[0]);
    setAge("");
    setPlayerHeight("");
    setGames("");
    setCleanSheet("");
    setPeneltyStop("");
    setGoals("");
    setAssists("");
  };

  // מחיקה
  const handleDelete = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  // עריכה
  const handleEdit = (player: Player) => {
    setEditingId(player.id);
    setName(player.name);
    setShirt(player.shirt?.toString() ?? "");
    setState(countries.find((c) => c.code === player.state) ?? countries[0]);
    setPlayerPosition(player.playerPosition ?? positions[0]);
    setAge(player.age?.toString() ?? "");
    setPlayerHeight(player.playerHeight ?? "");
    setGames(player.games?.toString() ?? "");
    setCleanSheet(player.cleanSheet?.toString() ?? "");
    setPeneltyStop(player.peneltyStop?.toString() ?? "");
    setGoals(player.goals?.toString() ?? "");
    setAssists(player.assists?.toString() ?? "");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ניהול שחקנים</Text>

      {/* שדות */}
      <TextInput
        placeholder="שם"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TextInput
        placeholder="חולצה"
        value={shirt}
        onChangeText={setShirt}
        style={styles.input}
        placeholderTextColor="#ccc"
      />

      {/* Dropdown למדינה */}
      <Text style={styles.label}>מדינה</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setStateDropdownOpen(!stateDropdownOpen)}
      >
        <CountryFlag isoCode={state.code} size={25} />
        <Text style={{ marginLeft: 10, color: "#FFD700" }}>{state.name}</Text>
      </TouchableOpacity>

      {stateDropdownOpen && (
        <View style={styles.dropdown}>
          <ScrollView style={{ maxHeight: 150 }}>
            {countries.map((c) => (
              <TouchableOpacity
                key={c.code}
                style={styles.dropdownItem}
                onPress={() => {
                  setState(c);
                  setStateDropdownOpen(false);
                }}
              >
                <CountryFlag isoCode={c.code} size={25} />
                <Text style={{ marginLeft: 10, color: "#fff" }}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Dropdown למיקום */}
      <Text style={styles.label}>מיקום</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setPositionDropdownOpen(!positionDropdownOpen)}
      >
        <Text style={{ color: "#FFD700" }}>{playerPosition}</Text>
      </TouchableOpacity>

      {positionDropdownOpen && (
        <View style={styles.dropdown}>
          {positions.map((pos) => (
            <TouchableOpacity
              key={pos}
              style={styles.dropdownItem}
              onPress={() => {
                setPlayerPosition(pos);
                setPositionDropdownOpen(false);
              }}
            >
              <Text style={{ color: "#fff" }}>{pos}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* שדות נוספים */}
      <TextInput
        placeholder="גיל"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="גובה"
        value={playerHeight}
        onChangeText={setPlayerHeight}
        style={styles.input}
        placeholderTextColor="#ccc"
      />
      <TextInput
        placeholder="הופעות"
        value={games}
        onChangeText={setGames}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="שערים"
        value={goals}
        onChangeText={setGoals}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="בישולים"
        value={assists}
        onChangeText={setAssists}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="רשת נקייה"
        value={cleanSheet}
        onChangeText={setCleanSheet}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />
      <TextInput
        placeholder="פנדלים"
        value={peneltyStop}
        onChangeText={setPeneltyStop}
        style={styles.input}
        placeholderTextColor="#ccc"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>{editingId ? "עדכן" : "הוסף"}</Text>
      </TouchableOpacity>

      {/* רשימת שחקנים */}
      <Text style={[styles.title, { marginTop: 20 }]}>השחקנים:</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerName}>
              {item.name} #{item.shirt} ({item.playerPosition})
            </Text>
            <View style={styles.playerActions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.editButton}>ערוך</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>מחק</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: { color: "#FFD700", fontWeight: "bold", marginBottom: 5 },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 8,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: "#111",
    borderRadius: 8,
    maxHeight: 150,
    marginBottom: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  saveButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  playerItem: {
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  playerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  editButton: { color: "#FFD700", fontWeight: "bold" },
  deleteButton: { color: "red", fontWeight: "bold" },
});
