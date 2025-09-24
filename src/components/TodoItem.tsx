import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type TodoItemProps = {
  todo: { id: string; title: string; completed: boolean; createdAt: string };
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

// Format date & time using device locale
const formatDateTime = (dateString: string) => {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return 'Unknown date';

  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  console.log('🚀 ~ TodoItem ~ todo:', todo);
  return (
    <View style={styles.card}>
      {/* Left side: title + date */}
      <View style={styles.left}>
        <Text
          style={[styles.text, todo.completed && styles.completed]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>
        <Text style={styles.date}>{formatDateTime(todo.createdAt)}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          onPress={() => toggleTodo(todo.id)}
          style={[
            styles.button,
            todo.completed ? styles.doneButton : styles.pendingButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              todo.completed ? styles.doneText : styles.pendingText,
            ]}
          >
            {todo.completed ? 'Undo' : 'Done'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => deleteTodo(todo.id)}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Android elevation
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    paddingRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
  },
  pendingButton: {
    backgroundColor: '#E0E0E0',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  doneText: {
    color: 'white',
  },
  pendingText: {
    color: 'black',
  },
  deleteText: {
    color: 'white',
  },
});
