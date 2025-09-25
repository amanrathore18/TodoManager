import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

//* Home screen layout: Combines AddTodo (input) and TodoList (display) components
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <AddTodo />
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
});

export default HomeScreen;
