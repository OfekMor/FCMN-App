// PlayerCarousel.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import shirtIcon from "../assets/images/tshirt.png";
import CountryFlag from "react-native-country-flag";
import { Player } from "@/app/types/Player";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.6;
const SIDE_PADDING = (width - ITEM_WIDTH) / 2;

interface PlayerCarouselProps {
  players: Player[];
  onPlayerPress?: (player: Player) => void;
}

const REPEAT = 50;

export default function PlayerCarousel({
  players,
  onPlayerPress,
}: PlayerCarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<PlayerWithId>>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  interface PlayerWithId extends Player {
    uniqueId: string;
  }

  const data: PlayerWithId[] = players.length
    ? Array.from({ length: REPEAT }).flatMap((_, repeatIndex) =>
        players.map((player, playerIndex) => ({
          ...player,
          uniqueId: `${repeatIndex}-${playerIndex}-${player.name}-${player.shirt}`,
        }))
      )
    : [];

  useEffect(() => {
    if (data.length && listRef.current) {
      const centerIndex = Math.floor((players.length * REPEAT) / 2);
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: centerIndex, animated: false });
      }, 0);
    }
  }, [data.length]);

  const renderItem = ({
    item,
    index,
  }: {
    item: PlayerWithId;
    index: number;
  }) => {
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0.85, 1, 0.85, 0.7],
      extrapolate: "clamp",
    });

    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["-16deg", "-8deg", "0deg", "8deg", "16deg"],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.1, 0.45, 1, 0.45, 0.1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onPlayerPress?.(item);
          setSelectedPlayer(item);
          setVisibleModal(true);
        }}
        style={{ width: ITEM_WIDTH, alignItems: "center" }}
      >
        <Animated.View
          style={[
            styles.cardOutline,
            { transform: [{ scale }, { rotate }], opacity },
          ]}
        >
          <View style={styles.card}>
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("../assets/images/placeholder.png")
              }
              style={styles.image}
            />
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.shirtWrapper}>
            <Image source={shirtIcon} style={styles.shirtIcon} />
            <Text style={styles.shirtNumber}>{item.shirt ?? "-"}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Animated.FlatList
        ref={listRef}
        data={data}
        horizontal
        keyExtractor={(item) => item.uniqueId}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        bounces={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: SIDE_PADDING,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        renderItem={renderItem}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisibleModal(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => setVisibleModal(false)}
                >
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                {selectedPlayer && (
                  <>
                    <View style={{ position: "relative" }}>
                      <Image
                        source={
                          selectedPlayer.image
                            ? { uri: selectedPlayer.image }
                            : require("../assets/images/placeholder.png")
                        }
                        style={styles.modalImage}
                      />
                      <View style={styles.flagLocation}>
                        <CountryFlag
                          isoCode={selectedPlayer.state ?? "IL"}
                          size={45}
                        />
                      </View>
                      <View style={styles.shirtNumberLocation}>
                        <Image
                          source={shirtIcon}
                          style={{ width: 20, height: 20, marginRight: 3 }}
                        />
                        <Text style={styles.shirtNumberModal}>
                          {selectedPlayer.shirt ?? "-"}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.modalName}>{selectedPlayer.name}</Text>
                    <Text style={styles.modalPosition}>
                      {selectedPlayer.playerPosition ?? "מיקום לא ידוע"}
                    </Text>
                    <Text style={styles.modalInfo}>
                      גיל - {selectedPlayer.age ?? "-"} | גובה -{" "}
                      {selectedPlayer.playerHeight ?? "-"}
                    </Text>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                      <View style={{ alignItems: "center" }}>
                        <Image
                          style={styles.statsIconSmall}
                          source={require("../assets/images/soccer-field.png")}
                        ></Image>
                        <View style={styles.statBox}>
                          <Text style={styles.statValue}>
                            {selectedPlayer.games ?? "-"}
                          </Text>
                          <Text style={styles.statLabel}>הופעות</Text>
                        </View>
                      </View>

                      {selectedPlayer.position === "Goalkeeper" ? (
                        <>
                          <View style={{ alignItems: "center" }}>
                            <Image
                              style={styles.statsIconSmall}
                              source={require("../assets/images/goalkeeper.png")}
                            ></Image>
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>
                                {selectedPlayer.cleanSheet ?? "-"}
                              </Text>
                              <Text style={styles.statLabel}>רשת נקייה</Text>
                            </View>
                          </View>
                          <View style={{ alignItems: "center" }}>
                            <Image
                              style={styles.statsIconSmall}
                              source={require("../assets/images/penalty-stop.png")}
                            ></Image>
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>
                                {selectedPlayer.peneltyStop ?? "-"}
                              </Text>
                              <Text style={styles.statLabel}>פנדלים</Text>
                            </View>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={{ alignItems: "center" }}>
                            <Image
                              style={styles.statsIconSmall}
                              source={require("../assets/images/football.png")}
                            ></Image>
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>
                                {selectedPlayer.goals ?? "-"}
                              </Text>
                              <Text style={styles.statLabel}>שערים</Text>
                            </View>
                          </View>
                          <View style={{ alignItems: "center" }}>
                            <Image
                              style={styles.statsIconSmall}
                              source={require("../assets/images/football-shoes.png")}
                            ></Image>
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>
                                {selectedPlayer.assists ?? "-"}
                              </Text>
                              <Text style={styles.statLabel}>בישולים</Text>
                            </View>
                          </View>
                        </>
                      )}
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cardOutline: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    width: ITEM_WIDTH * 0.9,
    height: ITEM_WIDTH * 1.1,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  name: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "900",
    color: "#fcde11",
  },
  shirtWrapper: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  shirtIcon: { width: 25, height: 25, marginRight: 5 },
  shirtNumber: { color: "white", fontSize: 23, fontWeight: "800" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    opacity: 0.8,
    alignItems: "center",
  },
  modalView: {
    height: "57%",
    width: "80%",
    borderRadius: 20,
    backgroundColor: "#000",
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 10, left: 10, zIndex: 2, padding: 5 },
  closeText: { fontSize: 26, color: "white", fontWeight: "bold" },
  modalImage: { width: 150, height: 150, borderRadius: 75, marginBottom: 15 },
  flagLocation: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 45,
    height: 45,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  statsIconSmall: {
    width: 30,
    height: 30,
    marginBottom: 10,
    resizeMode: "contain",
  },
  shirtNumberLocation: {
    position: "absolute",
    flexDirection: "row",
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    gap: 3,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  shirtNumberModal: { color: "white", fontWeight: "800", fontSize: 20 },
  modalName: { fontSize: 26, fontWeight: "bold", color: "white" },
  modalPosition: {
    color: "white",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "500",
  },
  modalInfo: { color: "white" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  statBox: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    minWidth: 80,
  },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#fcde11" },
  statLabel: { fontSize: 14, color: "#fff", marginTop: 4 },
});
