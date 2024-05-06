import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [
  {
    id: 0,
    text: 'Learn React',
    completed: true
  },
];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const nextId = Math.max(...state.map(todo => todo.id)) + 1;

      const newTodo: Todo = {
        id: nextId,
        text: action.payload,
        completed: false
      };

      state.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{id: number, text: string}>) => {
      const todo = state.find(todo => todo.id === action.payload.id);

      if (todo) {
        todo.text = action.payload.text;
      }
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
