import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { meAPI } = useAuth();
  const getMeData = async () => {
    try {
      meAPI && (await meAPI());
    } catch (e) {
      console.log(e);
    }

  };
  useEffect(() => {
    getMeData();
  }, []);
  return <AppRoutes />;
}

export default App;
