import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const LogIn = ({
  setModallog,
  setModalsign,
  modallog,
  setConnected,
  connected,
}) => {
  const [articlelogin, setArticlelogin] = useState({ email: "", password: "" });
  const [errorLogIn, setErrorLogIn] = useState("");

  const fetchLogIn = async () => {
    try {
      setErrorLogIn("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        articlelogin
      );
      // setData2(response.data);
      const token = response.data.token;
      // console.log(token);
      Cookies.set("token", token, { expires: 10 });
      setConnected(true);
      // Cookies.get("myLoggedCookie");
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorLogIn("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div>
      {modallog && (
        <main id="myModal" className="modal ">
          <form
            class="form"
            id="myForm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchLogIn();
              if (errorLogIn !== "") {
                setModallog(false);
              }
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
