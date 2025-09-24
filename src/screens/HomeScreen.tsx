import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <AddTodo />
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
});

export default HomeScreen;
