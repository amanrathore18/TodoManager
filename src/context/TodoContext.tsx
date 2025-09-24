import React, { createContext, useState, useContext } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Helper to request authentication before any action
  const authenticate = async (): Promise<boolean> => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to manage your TODOs',
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
  };

  const addTodo = async (title: string) => {
    if (!(await authenticate())) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), title, completed: false },
    ]);
  };

  const toggleTodo = async (id: string) => {
    if (!(await authenticate())) return;
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = async (id: string) => {
    if (!(await authenticate())) return;
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};
