import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';

type Props = {
  todo: { id: string; title: string; completed: boolean };
};

const TodoItem = ({ todo }: Props) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <View style={styles.item}>
      <Text style={[styles.text, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
      <View style={styles.buttons}>
        <Button
          title={todo.completed ? 'Undo' : 'Done'}
          onPress={() => toggleTodo(todo.id)}
        />
        <Button
          title="Delete"
          color="red"
          onPress={() => deleteTodo(todo.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  buttons: { flexDirection: 'row', gap: 8 },
});

export default TodoItem;
