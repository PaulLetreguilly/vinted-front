import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const SignUp = ({ setModallog, setModalsign, modalsign, setConnected }) => {
  const [article, setArticle] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        article
      );
      console.log(response.data);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 10 });
      setConnected(true);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div>
      {modalsign && (
        <main id="myModal" className="modal ">
          <form
            class="form"
            id="myForm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchData();
              if (errorMessage !== "") {
                setModalsign(false);
              }
            }}
          >
            <h2>S'inscrire</h2>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={(event) => {
                const value = event.target.value;
                const newUsername = { ...article };
                newUsername.username = value;
                setArticle(newUsername);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                const value = event.target.value;
                const newEmail = { ...article };
                newEmail.email = value;
                setArticle(newEmail);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={(event) => {
                const value = event.target.value;
                const newPassword = { ...article };
                newPassword.password = value;
                setArticle(newPassword);
              }}
            />
            <span style={{ color: "red" }}>{errorMessage}</span>
            <div>
              <input type="checkbox" className="checkbox" />
              <span>S'inscrire à notre newsletter</span>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de my Vinted. Je
                confirme avoir au moins 57 ans.
              </p>
            </div>
            <input type="submit" value="S'inscrire" />
            <p
              className="switch"
              onClick={() => {
                setModalsign(false);
                setModallog(true);
              }}
            >
              Déjà un compte? Connecte-toi !
            </p>
            <div
              className="exit"
              onClick={() => {
                setModalsign(false);
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

export default SignUp;
