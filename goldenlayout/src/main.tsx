import React from 'react'
import ReactDOM from 'react-dom/client'
import 'dockview/dist/styles/dockview.css'
import './styles.css'
import App from './App.tsx'
import { store } from './Todolist/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<div className="app">
				<App />
			</div>
		</Provider>
	</React.StrictMode>
)
