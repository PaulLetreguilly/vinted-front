import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Header = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [modalsign, setModalsign] = useState(false);
  const [modallog, setModallog] = useState(false);
  const [article, setArticle] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [articlelogin, setArticlelogin] = useState({ email: "", password: "" });
  const [connected, setConnected] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        article
      );
      console.log(response.data);
      setData(response.data);
      const token = data.token;
      Cookies.set("token", token);
      // Cookies.get("mySignedCookie");
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLogIn = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        articlelogin
      );
      setData2(response.data);
      const token = data2.token;
      // console.log(token);
      Cookies.set("token", token);
      setConnected(true);
      // Cookies.get("myLoggedCookie");
    } catch (error) {
      console.log(error.message);
    }
  };

  // const navigate = useNavigate();

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
          {Cookies.get("token") && connected ? (
            <div>
              {" "}
              <button
                className="disconnect"
                onClick={() => {
                  Cookies.remove("log-in");
                  setConnected(false);
                }}
              >
                Se déconnecter
              </button>
              <button>vends tes articles</button>
            </div>
          ) : (
            <div>
              {" "}
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
          )}
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
              setModalsign(false);
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
      {modallog && (
        <main id="myModal" className="modal ">
          <form
            class="form"
            id="myForm"
            onSubmit={(event) => {
              event.preventDefault();
              fetchLogIn();
              setModallog(false);
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
    </section>
  );
};

export default Header;
