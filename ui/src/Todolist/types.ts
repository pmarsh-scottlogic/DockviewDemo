type TodoItem = {
	title: string
	complete: boolean
	location: string
	dueDate: Date
}

type Filters = {
	completedness: Completedness
}

type Completedness = 'complete' | 'to do' | 'complete or to do' | 'neither'

export type { TodoItem, Filters, Completedness }
