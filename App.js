import { Alert } from "react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Platform,
  Keyboard,
  FlatList,
  Switch,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import Task from "./components/Task";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 600;

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [recycleBin, setRecycleBin] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showRecycleBin, setShowRecycleBin] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = (index) => {
    let itemCopy = [...taskItems];
    setCompletedTasks([...completedTasks, taskItems[index]]);
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };

  const showInfo = (index) => {
    Alert.alert("Info", "Made by Mern Stack Developer Mohit");
  };

  const restoreTask = (index) => {
    let itemCopy = [...recycleBin];
    setTaskItems([...taskItems, recycleBin[index]]);
    itemCopy.splice(index, 1);
    setRecycleBin(itemCopy);
  };

  const permanentDeleteTask = (index) => {
    let itemCopy = [...recycleBin];
    itemCopy.splice(index, 1);
    setRecycleBin(itemCopy);
  };

  const moveToRecycleBin = (index) => {
    let itemCopy = [...taskItems];
    setRecycleBin([...recycleBin, taskItems[index]]);
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  };

  const toggleRecycleBin = () => {
    setShowRecycleBin(!showRecycleBin);
    setShowCompletedTasks(false);
  };

  const toggleCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
    setShowRecycleBin(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#333" : "#f5f5f5" },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: darkMode ? "#8A2BE2" : "#000", // Purple for dark mode, black for light mode
            },
          ]}
        >
          {showRecycleBin
            ? "Recycle Bin"
            : showCompletedTasks
            ? "Completed Tasks"
            : "Today's Tasks"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={darkMode}
          style={styles.darkModeToggle}
        />
        {/* Info Button */}
        <Pressable
          style={[
            styles.infoButton,
            { backgroundColor: darkMode ? "#8A2BE2" : "#8A2BE2" },
          ]}
          onPress={showInfo}
        >
          <Text style={styles.infoText}>i</Text>
        </Pressable>
      </View>

      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <FlatList
              data={
                showRecycleBin
                  ? recycleBin
                  : showCompletedTasks
                  ? completedTasks
                  : taskItems
              }
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.taskContainer,
                    {
                      backgroundColor: darkMode ? "#555" : "#fff",
                      borderColor: darkMode ? "#444" : "#e6e6e6",
                    },
                  ]}
                >
                  <Task text={item} />
                  <View style={styles.buttonRow}>
                    <Pressable
                      style={[
                        styles.deleteButton,
                        { backgroundColor: darkMode ? "#FF6347" : "#FF6347" },
                      ]}
                      onPress={() =>
                        showRecycleBin
                          ? restoreTask(index)
                          : moveToRecycleBin(index)
                      }
                    >
                      <Text style={styles.deleteText}>
                        {showRecycleBin ? "Restore" : "Delete"}
                      </Text>
                    </Pressable>

                    {showRecycleBin && (
                      <Pressable
                        style={[
                          styles.permanentDeleteButton,
                          {
                            backgroundColor: darkMode ? "#8B0000" : "#8B0000",
                          },
                        ]}
                        onPress={() => permanentDeleteTask(index)}
                      >
                        <Text style={styles.deleteText}>P. Delete</Text>
                      </Pressable>
                    )}

                    {!showRecycleBin && !showCompletedTasks && (
                      <Pressable
                        style={[
                          styles.doneButton,
                          {
                            backgroundColor: darkMode ? "#32CD32" : "#32CD32",
                          },
                        ]}
                        onPress={() => completeTask(index)}
                      >
                        <Text style={styles.doneText}>Done</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {!showRecycleBin && !showCompletedTasks && (
          <>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: darkMode ? "#555" : "#fff" },
              ]}
              placeholder={"Write a task"}
              placeholderTextColor={darkMode ? "#ddd" : "#000"}
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <View style={styles.addContainer}>
              <Pressable onPress={() => handleAddTask()}>
                <View
                  style={[
                    styles.addWrapper,
                    { backgroundColor: darkMode ? "#228B22" : "#4CAF50" },
                  ]}
                >
                  <Text style={styles.addText}>+</Text>
                </View>
              </Pressable>
              <Text
                style={[
                  styles.addLabel,
                  { color: darkMode ? "#fff" : "#333" }, // Make 'Add' text white in dark mode
                ]}
              >
                Add
              </Text>
            </View>
          </>
        )}
        <Pressable onPress={() => toggleRecycleBin()}>
          <View
            style={[
              styles.recycleBinWrapper,
              { backgroundColor: darkMode ? "#1E90FF" : "#008CBA" },
            ]}
          >
            <Text style={styles.recycleBinText}>
              {showRecycleBin ? "Show Tasks" : "Show Recyclesn Bin"}
            </Text>
          </View>
        </Pressable>
        <Pressable onPress={() => toggleCompletedTasks()}>
          <View
            style={[
              styles.completedTaskWrapper,
              { backgroundColor: darkMode ? "#FFA500" : "#FFD700" },
            ]}
          >
            <Text style={styles.completedTaskText}>
              {showCompletedTasks ? "Show Tasks" : "Show Completed Tasks"}
            </Text>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  tasksWrapper: {
    marginTop: 30,
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  items: {
    marginTop: 30,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  buttonRow: {
    flexDirection: "row",
  },
  deleteButton: {
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    elevation: 3,
  },
  permanentDeleteButton: {
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    elevation: 3,
  },
  doneButton: {
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: isLargeScreen ? "row" : "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    backgroundColor: "#fafafa",
    width: isLargeScreen ? 300 : 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addContainer: {
    alignItems: "center",
  },
  addWrapper: {
    width: 80,
    height: 80,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3e8e41",
    borderWidth: 1,
    elevation: 4,
  },
  addText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  addLabel: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  recycleBinWrapper: {
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },
  recycleBinText: {
    color: "#fff",
    fontWeight: "bold",
  },
  completedTaskWrapper: {
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
  },
  completedTaskText: {
    color: "#333",
    fontWeight: "bold",
  },

  infoButton: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8A2BE2", // Purple background
    elevation: 3,
  },
  infoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  darkModeToggle: {
    marginTop: -30,
  },
});
