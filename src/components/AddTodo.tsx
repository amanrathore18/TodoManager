import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useTodo } from '../context/TodoContext';

const AddTodo = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addTodo(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter new TODO"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
});

export default AddTodo;
