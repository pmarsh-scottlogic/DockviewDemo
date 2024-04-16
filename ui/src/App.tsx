import { DockviewReact, IDockviewPanelProps } from "dockview";

const components = {
  default: (props: IDockviewPanelProps) => {
    return (
      <div>
        <span>{props.api.title}</span>
      </div>
    );
  },
  iframe: () => {
    return (
      <iframe
        style={{
          width: "100%",
          height: "100%",
        }}
        src="https://dockview.dev"
      />
    );
  },
};

function App() {
  return (
    <>
      <DockviewReact
        onReady={() => {
          console.log("ready");
        }}
        components={components}
      />
    </>
  );
}

export default App;
