type TodoItem = {
	title: string
	complete: boolean
	location: string
	dueDate: Date
}

function getTodoItemId(todoItem: TodoItem) {
	return todoItem.title + todoItem.dueDate.toISOString() + todoItem.location
}

type Filters = {
	showToDo: boolean
	showComplete: boolean
	location: string
}

export type { TodoItem, Filters }
export { getTodoItemId }
