// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform, View, Text } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
// app/tabs/_layout.tsx
// app/_layout.tsx
// app/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Text, View, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#FFD700",
        drawerActiveTintColor: "#FFD700",
        drawerInactiveTintColor: "#fff",
        drawerStyle: { backgroundColor: "#000", width: 250 },
        drawerLabelStyle: { fontSize: 16, fontWeight: "bold" },
        // לוגו קטן בחלק העליון של כל מסך
        headerRight: () => (
          <Image
            source={require("../../assets/images/MaccabiNetanyaLogo.png")}
            style={{ width: 40, height: 40, marginRight: 15 }}
          />
        ),
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          {/* לוגו */}
          <View style={{ alignItems: "center", marginVertical: 30 }}>
            <Image
              source={require("../../assets/images/MaccabiNetanyaLogo.png")}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
          </View>

          {/* רשימת המסכים */}
          <DrawerItemList {...props} />

          {/* כפתור סגירה */}
          <View
            style={{
              marginTop: "auto",
              marginBottom: 30,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                color: "#FFD700",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center",
              }}
              onPress={() => props.navigation.closeDrawer()} // <-- כאן הסגירה האמיתית
            >
              סגור
            </Text>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🔍</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="players"
        options={{
          title: "Players",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🎮</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="PlayerManager"
        options={{
          title: "ניהול שחקנים",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🛠️</Text>
          ),
        }}
      />
    </Drawer>
  );
}
