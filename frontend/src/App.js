import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Experience from "@/pages/Experience";
import Create from "@/pages/Create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Experience />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
