import { Link } from "react-router-dom";

const Allroutes = () => {
  return (
    <div className="ERROR">
      <div className="err">
        <span>OOPS...</span> 404 error
      </div>
      <div className="err2">
        Something went <span>TERRIBLY</span> wrong...{" "}
        <Link to="/" className="err3">
          {" "}
          Quick ! Go back !!
        </Link>
      </div>
    </div>
  );
};

export default Allroutes;
