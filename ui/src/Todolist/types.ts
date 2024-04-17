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
	completedness: Completedness
}

type Completedness = 'complete' | 'to do' | 'complete or to do' | 'neither'

export type { TodoItem, Filters, Completedness }
export { getTodoItemId }
