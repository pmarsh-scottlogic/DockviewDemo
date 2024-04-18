import React from 'react'
import ReactDOM from 'react-dom/client'
import 'dockview/dist/styles/dockview.css'
import './styles.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<div className="app">
			<App />
		</div>
	</React.StrictMode>
)
