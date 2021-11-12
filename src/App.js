import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Allroutes from "./pages/Allroutes";
import Header from "./components/Header";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("price-asc");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);

  return (
    <Router>
      <Header
        setTitle={setTitle}
        setSort={setSort}
        setMin={setMin}
        setMax={setMax}
        min={min}
        max={max}
      />
      <Routes>
        <Route
          path="/"
          element={<Home title={title} sort={sort} min={min} max={max} />}
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<Allroutes />} />
      </Routes>
    </Router>
  );
}

export default App;
