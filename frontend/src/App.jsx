import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import Layout from "./layout";

function App() {
  return (
    <ThemeToggle>
      {(isDark, toggleTheme) => (
        <Layout isDark={isDark} toggleTheme={toggleTheme} />
      )}
    </ThemeToggle>
  );
}

export default App;