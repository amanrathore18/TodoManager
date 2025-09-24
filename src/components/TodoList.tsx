import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodo();

  return (
    <View style={styles.container}>
      {todos.length === 0 ? (
        <Text style={styles.empty}>No TODOs yet. Add one!</Text>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 16 },
  empty: { textAlign: 'center', fontSize: 16, marginTop: 20 },
});

export default TodoList;
