import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, newTitle: string) => Promise<void>;
};

const STORAGE_KEY = 'TODO_LIST';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos on app start
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setTodos(JSON.parse(stored));
    })();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Authenticate before actions
  const authenticate = async (): Promise<boolean> => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to manage your TODOs',
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
  };

  // ✅ Add todo with validation + duplicate check
  const addTodo = async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) {
      Alert.alert('Validation Error', 'Please enter a todo title');
      return;
    }

    // check duplicate (case-insensitive)
    const duplicate = todos.find(
      t => t.title.toLowerCase() === trimmed.toLowerCase(),
    );
    if (duplicate) {
      Alert.alert(
        'Duplicate Error',
        'A todo with this title already exists. Please use a different one.',
      );
      return;
    }

    if (!(await authenticate())) return;

    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: trimmed,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  // ✅ Toggle todo with validation
  const toggleTodo = async (id: string) => {
    if (!(await authenticate())) return;

    const exists = todos.find(todo => todo.id === id);
    if (!exists) {
      Alert.alert('Error', 'Todo not found');
      return;
    }

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ✅ Delete todo with validation
  const deleteTodo = async (id: string) => {
    if (!(await authenticate())) return;

    const exists = todos.find(todo => todo.id === id);
    if (!exists) {
      Alert.alert('Error', 'Todo not found');
      return;
    }

    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = async (id: string, newTitle: string) => {
    if (!(await authenticate())) return;

    const exists = todos.find(todo => todo.id === id);
    if (!exists) {
      Alert.alert('Error', 'Todo not found');
      return;
    }

    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};
