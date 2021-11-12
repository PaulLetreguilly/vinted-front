import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import * as React from "react";
import { Range } from "react-range";
import SuperSimple from "./SuperSimple";

const Header = ({ setTitle, setSort, setMin, setMax, min, max }) => {
  const [modalsign, setModalsign] = useState(false);
  const [modallog, setModallog] = useState(false);
  const [article, setArticle] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [articlelogin, setArticlelogin] = useState({ email: "", password: "" });
  const [connected, setConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorLogIn, setErrorLogIn] = useState("");
  const [check, setCheck] = useState(false);

  const useEffect = () => {};

  const fetchData = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        article
      );
      console.log(response.data);
      // setData(response.data);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 10 });
      setConnected(true);
      // Cookies.get("mySignedCookie");
    } catch (error) {
      console.log(error.response.data.message);
      // console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
        // console.log(errorMessage);
      }
    }
  };

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
      if (
        error.response.status &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrorLogIn("Mauvais email et/ou mot de passe");
      }
    }
  };

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
          <div className="filter">
            {" "}
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              name=""
              id=""
              placeholder="Recherche des articles"
              className="searchBar"
            />
            <div className="under-filter">
              <div>
                <span className="trie">Trier par prix : </span>
                <label class="switch">
                  <input
                    type="checkbox"
                    onClick={() => {
                      if (check) {
                        setSort("price-asc");
                      } else {
                        setSort("price-desc");
                      }
                      setCheck(!check);
                    }}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <div className="priceRange">
                <span>
                  prix entre : {min} € et {max} €
                </span>
                <SuperSimple
                  min={min}
                  max={max}
                  setMin={setMin}
                  setMax={setMax}
                />
              </div>
            </div>
          </div>
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
                className="header-button"
                onClick={() => {
                  setModalsign(true);
                }}
              >
                s'inscrire
              </button>
              <button
                className="header-button"
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
      </header>
      {/****************** MODALS ********************/}
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
    </section>
  );
};

export default Header;
