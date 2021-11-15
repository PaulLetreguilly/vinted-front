import axios from "axios";
import { useState } from "react";

const LogIn = ({ setModallog, setModalsign, modallog, setUser }) => {
  const [articlelogin, setArticlelogin] = useState({ email: "", password: "" });
  const [errorLogIn, setErrorLogIn] = useState("");

  const fetchLogIn = async (event) => {
    try {
      event.preventDefault();

      setErrorLogIn("");
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/login",
        // "http://localhost:4000/user/login",
        "https://my-vinted-api-paul.herokuapp.com/login",
        articlelogin
      );
      if (response.data.token) {
        setUser(response.data.token);
        setModallog(false);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorLogIn("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div className="modal-body">
      {modallog && (
        <main id="myModal" className="modal">
          <form
            className="form"
            id="myForm"
            onSubmit={(event) => {
              fetchLogIn(event);
            }}
          >
            <h2>Se connecter</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                const value = event.target.value;
                const newEmail = { ...articlelogin };
                newEmail.email = value;
                setArticlelogin(newEmail);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                const value = event.target.value;
                const newPassword = { ...articlelogin };
                newPassword.password = value;
                setArticlelogin(newPassword);
              }}
            />
            <span style={{ color: "red" }}>{errorLogIn}</span>
            <input type="submit" value="Se connecter" />
            <p
              className="switch"
              onClick={() => {
                setModallog(false);
                setModalsign(true);
              }}
            >
              Pas encore de compte? Inscris-toi !
            </p>
            <div
              className="exit"
              onClick={() => {
                setModallog(false);
              }}
            >
              X
            </div>
          </form>
        </main>
      )}
    </div>
  );
};

export default LogIn;
