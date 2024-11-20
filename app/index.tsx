import { Colors } from "@/app-example/constants/Colors";
import { data, TodoItem } from "@/data/todos";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  // selecting container type based on the platform application runs on
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  // reading user preferred theme
  const colorScheme = Appearance.getColorScheme();
  // getting theme colors
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  // generating styles for the theme
  const styles = createStyles(theme, colorScheme);

  // FlatList components
  const separatorComp = <View style={styles.separator} />;

  // todos local state
  const [todos, setTodos] = useState<TodoItem[]>(data);
  // input value state
  const [inputValue, setInputValue] = useState("");
  // flag for update todo mode
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | undefined>();

  // add new todo handler
  const handleAddTodo = () => {
    if (inputValue.length < 0) return;

    const id = todos.length > 0 ? todos[0].id + 1 : 1;

    const newTodos = todos.concat({ id, completed: false, title: inputValue });

    setTodos(newTodos);

    setInputValue("");
  };

  // delete todo
  const handleDeleteTodo = (item: TodoItem) => {
    if (!item || !item.id) return;

    setTodos((prev) => prev.filter((todo) => todo.id !== item.id));
  };

  // select existing todo for update
  const handleTodoSelect = (item: TodoItem) => {
    if (!item || !item.id) return;

    setSelectedTodo(item);

    setInputValue(item.title);
  };

  // change todo status (complete)
  const handleChangeTodoStatus = (item: TodoItem) => {
    if (!item || !item.id) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // update todo with the new title value
  const handleUpdateTodo = () => {
    if (!selectedTodo) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...selectedTodo, title: inputValue }
          : todo
      )
    );

    setInputValue("");
    setSelectedTodo(undefined);
  };

  // cancel update
  const handleCancelUpdateTodo = () => {
    setInputValue("");
    setSelectedTodo(undefined);
  };

  return (
    <Container style={styles.contentContainer}>
      <Container style={styles.todoListInputArea}>
        <TextInput
          style={styles.todoListInput}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Add a new todo"
          placeholderTextColor={theme.placeholderColor}
          maxLength={180}
          multiline
        />
        {selectedTodo ? (
          <Container style={styles.todoListUpdateButtons}>
            <Pressable
              style={styles.todoListAddButton}
              onPress={handleUpdateTodo}
            >
              <Text style={styles.todoListAddButtonText}>Update</Text>
            </Pressable>
            <Pressable
              style={styles.todoListAddButton}
              onPress={handleCancelUpdateTodo}
            >
              <Text style={styles.todoListAddButtonText}>Cancel</Text>
            </Pressable>
          </Container>
        ) : (
          <Pressable style={styles.todoListAddButton} onPress={handleAddTodo}>
            <Text style={styles.todoListAddButtonText}>Add</Text>
          </Pressable>
        )}
      </Container>
      <FlatList
        data={todos.sort((a, b) => b.id - a.id)}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => separatorComp}
        renderItem={(item) => (
          <Container
            style={[
              styles.todoListRow,
              item.item.id === selectedTodo?.id
                ? styles.selectedTodoItem
                : null,
            ]}
          >
            <Container style={styles.todoListTextRow}>
              <Pressable
                onLongPress={() => handleTodoSelect(item.item)}
                onPress={() => handleChangeTodoStatus(item.item)}
              >
                <Text
                  style={[
                    styles.todoListItemText,
                    item.item.completed ? styles.todoListItemDone : null,
                  ]}
                >
                  {item.item.title}
                </Text>
              </Pressable>
            </Container>
            <Pressable onPress={() => handleDeleteTodo(item.item)}>
              <Ionicons name="trash" size={24} style={styles.deleteIcon} />
            </Pressable>
          </Container>
        )}
      ></FlatList>
    </Container>
  );
}

function createStyles(
  theme: typeof Colors.light,
  colorScheme: ColorSchemeName
) {
  return StyleSheet.create({
    contentContainer: {
      backgroundColor: theme.background,
      paddingVertical: 8,
      paddingBottom: 60,
    },
    separator: {
      height: 1,
      backgroundColor: theme.text,
      width: "100%",
    },
    todoListRow: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: 8,
      overflow: "hidden",
    },
    todoListTextRow: {
      width: "65%",
      marginVertical: 20,
      paddingRight: 5,
      flexGrow: 1,
    },
    todoListItemText: {
      color: theme.text,
      fontSize: 18,
    },
    todoListItemDone: {
      textDecorationLine: "line-through",
      opacity: 0.5,
    },
    deleteIcon: {
      marginVertical: "auto",
      width: 28,
      height: 28,
      backgroundColor: theme.deleteIconBackground,
      borderRadius: 50,
      textAlign: "center",
      textAlignVertical: "center",
    },
    todoListInputArea: {
      flexDirection: "row",
      gap: 8,
      marginHorizontal: 8,
    },
    todoListInput: {
      flexGrow: 1,
      borderWidth: 1,
      borderColor: theme.text,
      color: theme.text,
      borderRadius: 8,
      fontSize: 18,
      padding: 8,
      maxWidth: "75%",
    },
    todoListAddButton: {
      borderRadius: 8,
      backgroundColor: theme.todoButtonBackground,
      padding: 16,
      justifyContent: "center",
    },
    todoListAddButtonText: {
      color: theme.background,
      fontSize: 18,
    },
    todoListUpdateButtons: {
      flexDirection: "column",
    },
    selectedTodoItem: {
      // backgroundColor: colorScheme === "dark" ? "#696969" : "#000",
      backgroundColor: theme.selectedTodoBackground,
    },
  });
}
