import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ApplicationViews />
    </BrowserRouter>
  );
}

export default App;
