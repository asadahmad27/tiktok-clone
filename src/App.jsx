import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { meAPI } = useAuth();
  const getMeData = async () => {
    meAPI && (await meAPI());
  };
  useEffect(() => {
    getMeData();
  }, []);
  return <AppRoutes />;
}

export default App;
