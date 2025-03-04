import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoItem, TodoState } from '../types';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'todos',
  storage: AsyncStorage,
};

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; details: string; dueDate: string }>) => {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        title: action.payload.title,
        details: action.payload.details,
        dueDate: action.payload.dueDate,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<{ 
      id: string; 
      title: string;
      details: string;
      dueDate: string;
    }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.details = action.payload.details;
        todo.dueDate = action.payload.dueDate;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const allTodos = (state: { todos: TodoState }) => state.todos.todos;
export const selectCompletedTodos = (state: { todos: TodoState }) => 
  state.todos.todos.filter(todo => todo.completed);
export const selectPendingTodos = (state: { todos: TodoState }) => 
  state.todos.todos.filter(todo => !todo.completed);

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default persistReducer(persistConfig, todoSlice.reducer);
