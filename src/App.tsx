import { Outlet, useNavigate } from "react-router";
import "./App.scss";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, []);

  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
}

export default App;
