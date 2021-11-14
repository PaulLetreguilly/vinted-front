import { Link } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import SuperSimple from "./SuperSimple";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const Header = ({
  setTitle,
  setSort,
  setMin,
  setMax,
  min,
  max,
  token,
  setUser,
  isHome,
}) => {
  const [modalsign, setModalsign] = useState(false);
  const [modallog, setModallog] = useState(false);
  const [check, setCheck] = useState(false);
  // const [isNumber, setIsNumber] = useState(false);

  const navigate = useNavigate();

  // const handleChangeMin = (event) => {
  //   if (typeof event.target.value === "number") {
  //     setMin(event.targer.value);
  //   } else {
  //   }
  // };
  // const handleChangeMax = (event) => {
  //   if (typeof Number(event.target.value) === "number") {
  //     setMax(event.targer.value);
  //   } else {
  //   }
  // };

  return (
    <section className={(modalsign || modallog) && "modal-body"}>
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
              className="searchBar"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              name=""
              id=""
              placeholder="Recherche des articles"
            />
            {isHome && (
              <div className="under-filter">
                <div>
                  <span className="trie">Trier par prix : </span>
                  <label className="switch">
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
                    <span className="slider round"></span>
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
                <div className="priceMedia">
                  <input
                    type="text"
                    placeholder="min"
                    onChange={(event) => {
                      // handleChangeMin(event);
                      setMin(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="max"
                    onChange={(event) => {
                      // handleChangeMax(event);
                      setMax(event.target.value);
                    }}
                  />
                  {/* {isNumber && (
                  <p className="checkNumber">veuillez rentrer un nombre</p>
                )} */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="right-header">
          {token ? (
            <div>
              {" "}
              <button
                className="disconnect"
                onClick={() => {
                  setUser(null);
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
              <button
                onClick={() => {
                  navigate("/offer/publish");
                }}
              >
                vends tes articles
              </button>
            </div>
          )}
        </div>
      </header>
      {/****************** MODALS ********************/}
      <SignUp
        setModallog={setModallog}
        modalsign={modalsign}
        setModalsign={setModalsign}
        setUser={setUser}
      />
      <LogIn
        setModallog={setModallog}
        modallog={modallog}
        setModalsign={setModalsign}
        setUser={setUser}
      />
    </section>
  );
};

export default Header;
