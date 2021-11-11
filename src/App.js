import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Allroutes from "./pages/Allroutes";
import Login from "./pages/Login";
import Header from "./components/Header";

import "./App.css";

function App() {
  // const id = "092837293";
  // const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://lereacteur-vinted-api.herokuapp.com/offers "
  //       );
  //       console.log(response.data);
  //       setData(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Login />} />
        <Route path="*" element={<Allroutes />} />
      </Routes>
    </Router>
  );
}

export default App;
