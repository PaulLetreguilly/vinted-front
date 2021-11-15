import axios from "axios";
import { useState } from "react";

const SignUp = ({ setModallog, setModalsign, modalsign, setUser }) => {
  const [article, setArticle] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        // "http://localhost:4000/user/signup",
        "https://my-vinted-api-paul.herokuapp.com/signup",
        article
      );
      if (response.data.token) {
        setUser(response.data.token);
        setModalsign(false);
      }

      //   "https://lereacteur-vinted-api.herokuapp.com/user/signup"

      // "https://my-vinted-api-paul.herokuapp.com/user/signup"
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div className="modal-body">
      {modalsign && (
        <main id="myModal" className="modal ">
          <form
            className="form"
            id="myForm"
            onSubmit={(event) => {
              fetchData(event);
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
