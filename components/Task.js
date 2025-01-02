import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Task = (props) => {
  // Function to handle task press and show an alert
  const handlePress = () => {
    Alert.alert("Task Info", `Task: ${props.text}`, [{ text: "OK" }]);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {" "}
      {/* Make task clickable */}
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "purple",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    backgroundColor: "yellow", // Add this line
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

/*import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flexWrap: "wrap" },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "purple",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    backgroundColor: "yellow", // Add this line
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});
*/
