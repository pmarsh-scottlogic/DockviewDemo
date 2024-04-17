type TodoItem = {
	title: string
	complete: boolean
	location: string
	dueDate: Date
}

type Filters = {
	completedness: 'complete' | 'to do' | 'complete or to do'
}

export type { TodoItem, Filters }
