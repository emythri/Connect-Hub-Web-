// components/UsersList.jsx
import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function UsersList({ onUserSelect }) {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onUserSelect(item)} style={styles.userItem}>
          <Text style={styles.username}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  userItem: {
    padding: 15,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 10,
  },
  username: {
    fontSize: 18,
    color: "#333",
  },
});
