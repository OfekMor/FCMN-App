import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import shirtIcon from "../assets/images/tshirt.png";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width * 0.6;
const SIDE_PADDING = (width - ITEM_SIZE) / 2;

export default function PlayerCarousel({ players }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);

  const REPEAT = 50;
  const data = players.length
    ? Array.from({ length: REPEAT }, () => players).flat()
    : [];

  useEffect(() => {
    if (data.length && listRef.current) {
      const centerIndex = Math.floor((players.length * REPEAT) / 2);
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index: centerIndex, animated: false });
      }, 0);
    }
  }, [data.length]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
      (index + 2) * ITEM_SIZE,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0.85, 1, 0.85, 0.7],
      extrapolate: "clamp",
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 0.6, 1, 0.6, 0.3],
      extrapolate: "clamp",
    });
    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ["-16deg", "-8deg", "0deg", "8deg", "16deg"],
      extrapolate: "clamp",
    });

    return (
      <View
        keyExtractor={(item) => item.id}
        style={{ width: ITEM_SIZE, alignItems: "center" }}
      >
        <Animated.View
          style={[
            styles.cardOutline,
            { transform: [{ scale }, { rotate }], opacity },
          ]}
        >
          <Animated.View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </Animated.View>

          <Text style={styles.name}>{item.name}</Text>

          {/* מספר חולצה + אייקון */}
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <Image
              source={shirtIcon}
              style={{ width: 25, height: 25, marginRight: 5 }}
            />
            <Text style={{ color: "white", fontSize: 23, fontWeight: 800 }}>
              {item.shirt}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Animated.FlatList
      ref={listRef}
      data={data}
      horizontal
      keyExtractor={(_, i) => String(i)}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={ITEM_SIZE}
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
        length: ITEM_SIZE,
        offset: ITEM_SIZE * index,
        index,
      })}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  cardOutline: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: ITEM_SIZE * 0.9,
    height: ITEM_SIZE * 1.1,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#ffffffff",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: "#ffffffff",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  name: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: "900",
    color: "#fcde11",
  },
  position: { fontSize: 40, color: "#fcde11", fontWeight: 800 },
  shirt: {
    fontSize: 32,
    fontWeight: 600,
    color: "white",
    fontFamily: "Roboto_400Regular",
  },
});
