import { Link } from "react-router-dom";
// import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import * as React from "react";
// import { Range } from "react-range";
import SuperSimple from "./SuperSimple";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Header = ({ setTitle, setSort, setMin, setMax, min, max }) => {
  const [modalsign, setModalsign] = useState(false);
  const [modallog, setModallog] = useState(false);
  const [connected, setConnected] = useState(false);
  const [check, setCheck] = useState(false);

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
      <SignUp
        setModallog={setModallog}
        modalsign={modalsign}
        setModalsign={setModalsign}
        setConnected={setConnected}
      />
      <LogIn
        setModallog={setModallog}
        modallog={modallog}
        setModalsign={setModalsign}
        setConnected={setConnected}
      />
    </section>
  );
};

export default Header;
