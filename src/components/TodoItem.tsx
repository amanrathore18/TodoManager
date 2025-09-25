import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

type Props = {
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, newTitle: string) => void;
  todo: {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
  };
};

const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  updateTodo,
  toggleTodo,
}) => {
  const { id, title, completed, createdAt } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = async () => {
    if (newTitle.trim() && newTitle !== title) {
      await updateTodo(id, newTitle.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTodo(id) },
      ],
      { cancelable: true },
    );
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
          numberOfLines={1}
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

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={handleDelete}
        accessibilityLabel={`delete-button-${id}`}
      >
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
