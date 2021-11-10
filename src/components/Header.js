import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="left-header">
        {" "}
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/fr/thumb/6/68/Vinted-logo.svg/1200px-Vinted-logo.svg.png"
          alt=""
        />
        <input type="text" name="" id="" placeholder="Recherche des articles" />
      </div>

      <div>
        <button>s'inscrire</button>
        <button>se connecter</button>
        <button>vends tes articles</button>
      </div>

      {/* <Link to="/">Go to home page</Link> */}
    </header>
  );
};

export default Header;
