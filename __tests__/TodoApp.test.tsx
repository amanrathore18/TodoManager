import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
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
  afterEach(() => {
    //* Ensure DOM cleanup between tests
    cleanup();
    jest.restoreAllMocks();
  });

  it('shows empty state when no todos exist', () => {
    setup();
    expect(screen.getByText('No TODOs yet. Add one!')).toBeTruthy();
  });

  it('adds a todo', async () => {
    setup();
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Test Task',
    );
    fireEvent.press(screen.getByText('＋'));

    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeTruthy();
    });
  });

  it('updates a todo', async () => {
    setup();
    //* Add initial todo
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Old Task',
    );
    fireEvent.press(screen.getByText('＋'));

    //* Wait for it to render
    const todo = await waitFor(() => screen.getByText('Old Task'));
    fireEvent.press(todo);

    //* Edit the todo
    const input = screen.getByDisplayValue('Old Task');
    fireEvent.changeText(input, 'Updated Task');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(screen.getByText('Updated Task')).toBeTruthy();
      expect(screen.queryByText('Old Task')).toBeNull();
    });
  });

  it('deletes a todo after confirming in modal', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(12345);
    setup();
    //* Add a todo
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Delete me',
    );
    fireEvent.press(screen.getByText('＋'));

    await waitFor(() => screen.getByText('Delete me'));

    //* Mock Alert and simulate confirm
    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons) => {
      const deleteBtn = buttons?.find(b => b.text === 'Delete');
      deleteBtn?.onPress?.();
    });

    fireEvent.press(screen.getByLabelText('delete-button-12345'));

    await waitFor(() => {
      expect(screen.queryByText('Delete me')).toBeNull();
    });
  });

  it('cancels delete when dismissing modal', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(123456);
    setup();
    //* Add a todo
    fireEvent.changeText(
      screen.getByPlaceholderText('Type your task here...'),
      'Keep me',
    );
    fireEvent.press(screen.getByText('＋'));

    await waitFor(() => screen.getByText('Keep me'));

    //* Mock Alert and simulate cancel
    jest.spyOn(Alert, 'alert').mockImplementation((_title, _msg, buttons) => {
      const cancelBtn = buttons?.find(b => b.text === 'Cancel');
      cancelBtn?.onPress?.();
    });

    fireEvent.press(screen.getByLabelText('delete-button-123456'));

    await waitFor(() => {
      expect(screen.getByText('Keep me')).toBeTruthy();
    });
  });
});
