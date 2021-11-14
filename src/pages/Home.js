import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";

const Home = ({ title, sort, min, max }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-vinted-api-paul.herokuapp.com/offers",
          {
            params: {
              title: title,
              sort: sort,
              priceMin: min,
              priceMax: max,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, sort, min, max]);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section
    // style={{ overflow: "hidden" }}
    >
      <Hero />
      <div className="offer-count">{data.count} offres trouvées</div>
      <div className="container">
        {/* {console.log(data.offers)} */}
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
