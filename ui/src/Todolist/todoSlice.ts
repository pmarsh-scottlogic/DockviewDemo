import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TodoItem } from './types'
import PLACEHOLDER_TODO_ITEMS from './placeholderItems'

type TodoListState = {
	todoItems: TodoItem[]
}

const initialState: TodoListState = {
	todoItems: PLACEHOLDER_TODO_ITEMS,
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		toggleTodoItemCompleteness: (state, action: PayloadAction<string>) => {
			const title = action.payload
			state.todoItems = state.todoItems.map((todoItem) =>
				todoItem.title === title
					? { ...todoItem, complete: !todoItem.complete }
					: todoItem
			)
		},
		addTodoItemToList: (state, action: PayloadAction<TodoItem>) => {
			const newItem = action.payload
			state.todoItems = [...state.todoItems, newItem]
		},
	},
})

export const { toggleTodoItemCompleteness, addTodoItemToList } =
	todoSlice.actions
export default todoSlice.reducer
