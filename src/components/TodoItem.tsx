import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTodo } from '../context/TodoContext';

type Props = {
  todo: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
  };
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  console.log('🚀 ~ TodoItem ~ todo:', todo);
  const { id, title, completed, createdAt } = todo;
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = async () => {
    if (newTitle.trim() && newTitle !== title) {
      await updateTodo(id, newTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <View style={[styles.card, completed && styles.completedCard]}>
      <TouchableOpacity
        style={[styles.circle, completed && styles.circleDone]}
        onPress={() => toggleTodo(id)}
      >
        {completed && <Text style={styles.check}>✔</Text>}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          autoFocus
          onSubmitEditing={handleSave}
          onBlur={handleSave}
        />
      ) : (
        <Text
          style={[styles.title, completed && styles.titleDone]}
          onPress={() => setIsEditing(true)}
        >
          {title}
        </Text>
      )}

      <Text style={styles.date}>
        {new Date(createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}{' '}
        • {new Date(createdAt).toLocaleDateString()}
      </Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTodo(id)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 2,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#f0f8f0',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circleDone: {
    backgroundColor: '#4CAF50',
  },
  check: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginRight: 10,
  },
  deleteBtn: {
    padding: 6,
  },
  deleteText: {
    fontSize: 18,
    color: '#e53935',
    fontWeight: 'bold',
  },
});

export default TodoItem;
