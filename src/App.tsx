import DockLayout from './layout/DockLayout';

// Top level react component. If we end up needing to add a router, or state management like redux,
// the context provider components will be added here.
const App = () => {
  return (
    <DockLayout />
  );
}

export default App;
