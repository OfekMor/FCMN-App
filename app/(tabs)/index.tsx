import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PlayerCarousel from "../../components/PlayerCarousel";
import { useState, useEffect } from "react";

import * as Font from "expo-font";

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      RubikDoodleShadow: require("../../assets/fonts/RubikDoodleShadow-Regular.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚽ מכבי נתניה</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "RubikDoodleShadow", fontSize: 24 }}>
          זה טקסט עם הפונט החדש 🎉
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
