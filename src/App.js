import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Allroutes from "./pages/Allroutes";
import Header from "./components/Header";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("price-asc");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);
  const [token, setToken] = useState(null);
  const [isHome, setIsHome] = useState(false);
  const [modallog, setModallog] = useState(false);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
    // console.log(Cookies.get("userToken"));
  };

  return (
    <Router>
      <Header
        isHome={isHome}
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
              setIsHome={setIsHome}
              title={title}
              sort={sort}
              min={min}
              max={max}
              token={token}
              setModallog={setModallog}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer setIsHome={setIsHome} />} />
        <Route
          path="/offer/publish"
          element={<Publish setIsHome={setIsHome} token={token} />}
        />
        <Route path="*" element={<Allroutes setIsHome={setIsHome} />} />
      </Routes>
    </Router>
  );
}

export default App;
