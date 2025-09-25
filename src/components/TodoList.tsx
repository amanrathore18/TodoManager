import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTodo } from 'src/context/TodoContext';
import TodoItem from 'src/components/TodoItem';

//* TodoList Component: Displays all todos or an empty state message.
const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodo();

  return (
    <View style={styles.container}>
      {todos.length ? ( //* Render list of todos
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              todo={item}
            />
          )}
        />
      ) : (
        //*  Show empty message when no todos exist
        <Text style={styles.empty}>No TODOs yet. Add one!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 16 },
  empty: { textAlign: 'center', fontSize: 16, marginTop: 20 },
});

export default TodoList;
