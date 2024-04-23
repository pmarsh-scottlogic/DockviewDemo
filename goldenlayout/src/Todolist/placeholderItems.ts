import { TodoItem } from './types'

const PLACEHOLDER_TODO_ITEMS = [
	{
		title: 'Buy groceries',
		location: 'Tesco',
		complete: false,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Cook curry',
		location: 'Home',
		complete: false,
		dueDate: new Date(Date.parse('02 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Recycle batteries',
		location: 'Tesco',
		complete: false,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Take bins out',
		location: 'Home',
		complete: false,
		dueDate: new Date(Date.parse('03 Sep 2012 00:00:00 GMT')),
	},
	{
		title: 'Take kids to school',
		location: 'School',
		complete: true,
		dueDate: new Date(Date.parse('01 Sep 2012 00:00:00 GMT')),
	},
] as TodoItem[]

export default PLACEHOLDER_TODO_ITEMS
