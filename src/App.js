import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Allroutes from "./pages/Allroutes";
import Header from "./components/Header";
import Payment from "./pages/Payment";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("price-asc");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [modallog, setModallog] = useState(false);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        setTitle={setTitle}
        setSort={setSort}
        setMin={setMin}
        setMax={setMax}
        min={min}
        max={max}
        token={token}
        setUser={setUser}
        setModallog={setModallog}
        modallog={modallog}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              sort={sort}
              min={min}
              max={max}
              token={token}
              setModallog={setModallog}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/offer/publish" element={<Publish token={token} />} />
        <Route
          path="/payment/:id"
          element={<Payment token={token} setModallog={setModallog} />}
        />
        <Route path="*" element={<Allroutes />} />
      </Routes>
    </Router>
  );
}

export default App;
