import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ChatState } from "../../Context/ChatProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SideHeader() {
  const { user, setUser } = ChatState();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      setUser(null);
      navigation.navigate("Login"); // Make sure you have a Login screen in your navigator
    } catch (err) {
      Alert.alert("Error", "Failed to logout.");
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.username}>
        <Ionicons name="person-circle-outline" size={24} /> {user?.name}
      </Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d32f2f",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  logoutText: {
    color: "#fff",
    marginLeft: 5,
  },
});
