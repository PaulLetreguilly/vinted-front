import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [data, setData] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const [modalsign, setModalsign] = useState(false);
  const [modallog, setModallog] = useState(false);
  const [article, setArticle] = useState({
    email: "",
    username: "",
    password: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        article
      );
      console.log(response.data);
      setData(response.data);
      Cookies.set("myCookie", data.token);
      Cookies.get("myCookie");
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(data, "heyaa");

  const navigate = useNavigate();

  return (
    <section>
      <header>
        <div className="left-header">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/fr/thumb/6/68/Vinted-logo.svg/1200px-Vinted-logo.svg.png"
              alt=""
            />
          </Link>
          <input
            type="text"
            name=""
            id=""
            placeholder="Recherche des articles"
          />
        </div>

        <div className="right-header">
          <button
            onClick={() => {
              setModalsign(true);
            }}
          >
            s'inscrire
          </button>
          <button
            onClick={() => {
              setModallog(true);
            }}
          >
            se connecter
          </button>
          <button>vends tes articles</button>
        </div>

        {/* <Link to="/">Go to home page</Link> */}
      </header>
      {/* MODAL */}
      {modalsign && (
        <main id="myModal" className="modal ">
          <form
            class="form"
            id="myForm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchData();
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
            <div>
              <input type="checkbox" className="checkbox" />
              <span>S'inscrire à notre newsletter</span>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de my Vinted. Je
                confirme avoir au moins 57 ans.
              </p>
            </div>
            <input type="submit" value="Envoyer le formulaire" />
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
      {modallog && (
        <main id="myModal" className="modal ">
          <form
            class="form"
            id="myForm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchData();
            }}
          >
            <h2>Se connecter</h2>
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
            <div>
              <input type="checkbox" className="checkbox" />
              <span>S'inscrire à notre newsletter</span>
              <p>
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de my Vinted. Je
                confirme avoir au moins 57 ans.
              </p>
            </div>
            <input type="submit" value="Envoyer le formulaire" />
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
    </section>
  );
};

export default Header;
