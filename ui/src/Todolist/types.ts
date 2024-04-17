type TodoItem = {
	title: string
	complete: boolean
	location: string
	dueDate: Date
}

type Filters = {
	completedness: 'done' | 'not done' | 'done or not done'
}

export type { TodoItem, Filters }
