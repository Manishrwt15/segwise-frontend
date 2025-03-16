import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div>
      {showDashboard ? (
        <Dashboard />
      ) : (
        <Home onStart={() => setShowDashboard(true)} />
      )}
    </div>
  );
}

export default App;
