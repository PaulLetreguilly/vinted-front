import Offer from "./Offer";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Home = ({ data }) => {
  return (
    <section>
      <Hero />
      <div className="container">
        {data.offers.map((item, index) => {
          return (
            <Link key={index} className="offer" to={`/offer/${item._id}`}>
              <p className="user">{item.owner.account.username}</p>
              <img src={item.product_image.secure_url} alt="" />
              <div className="offer-detail">
                <span>{item.product_name}</span>
                <span className="price-home">{item.product_price} €</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
