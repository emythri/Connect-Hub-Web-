import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";

const backgroundImg = require("../assets/bg.png"); // Make sure image exists

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

export default function MyChats({ onUserSelect }) {
  return (
    <ImageBackground source={backgroundImg} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.header}>Select a User to Chat</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onUserSelect(item)}
              style={styles.userCard}
            >
              <Text style={styles.userText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Optional light overlay
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userCard: {
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    color: "#333",
  },
});


// // components/MyChats.jsx
// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// // You can replace this with a fetch from backend
// const users = [
//   { id: "1", name: "Alice" },
//   { id: "2", name: "Bob" },
//   { id: "3", name: "Charlie" },
// ];

// export default function MyChats({ onUserSelect }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Select a User to Chat</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => onUserSelect(item)}
//             style={styles.userCard}
//           >
//             <Text style={styles.userText}>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   userCard: {
//     padding: 15,
//     backgroundColor: "#ddd",
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   userText: {
//     fontSize: 18,
//     color: "#333",
//   },
// });
