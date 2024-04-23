import { GoldenLayout } from 'golden-layout'

const TestComponent = ({ label }: { label: string }) => <h1>{label}</h1>

myLayout.registerComponent('test-component', TestComponent)

//Once all components are registered, call
myLayout.init()

const App = () => {
	return <>hey</>
}

export default App
