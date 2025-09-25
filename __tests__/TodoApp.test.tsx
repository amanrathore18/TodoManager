import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { TodoProvider } from '../src/context/TodoContext';
import HomeScreen from '../src/screens/HomeScreen';
import { Alert } from 'react-native';

const setup = () =>
  render(
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>,
  );

describe('Todo App Base Cases', () => {
  beforeEach(() => {
    setup();
  });
  it('shows empty state when no todos exist', () => {
    expect(screen.getByText('No TODOs yet. Add one!')).toBeTruthy();
  });

  it('adds a todo', async () => {
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Test Task',
    );
    fireEvent.press(screen.getByText('＋'));

    await waitFor(() => expect(screen.getByText('Test Task')).toBeTruthy());
  });

  it('updates a todo', async () => {
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Old Task',
    );
    fireEvent.press(screen.getByText('＋'));

    const todo = await waitFor(() => screen.getByText('Old Task'));
    fireEvent.press(todo);

    const input = screen.getByDisplayValue('Old Task');
    fireEvent.changeText(input, 'Updated Task');
    fireEvent(input, 'submitEditing');

    await waitFor(() => expect(screen.getByText('Updated Task')).toBeTruthy());
  });
  it('deletes a todo after confirming in modal', async () => {
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Delete me',
    );
    fireEvent.press(screen.getByText('＋'));

    await waitFor(() => screen.getByText('Delete me'));

    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons) => {
      const deleteBtn = buttons?.find(b => b.text === 'Delete');
      deleteBtn?.onPress?.();
    });

    fireEvent.press(screen.getByLabelText(/^delete-button-/));

    await waitFor(() => {
      expect(screen.queryByText('Delete me')).toBeNull();
    });
  });
});
