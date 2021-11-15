import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faArrowLeft, faArrowRight);

const Home = ({ title, sort, min, max, setModallog, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "https://lereacteur-vinted-api.herokuapp.com/offers",
          // "http://localhost:4000/offers",
          "https://my-vinted-api-paul.herokuapp.com/offers",
          {
            params: {
              title: title,
              sort: sort,
              priceMin: min,
              priceMax: max,
              page: page,
              limit: limit,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setPages(Math.round(response.data.count / limit));
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, sort, min, max, page, limit, setPage, setLimit]);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section>
      <Hero setModallog={setModallog} token={token} />
      <div className="offer-count">
        <span>{data.count} offres trouvées </span>
        {/* <span>
          {page > 1 && (
            <button>
              <FontAwesomeIcon
                icon="arrow-left"
                onClick={() => {
                  const result = page - 1;
                  setPage(result);
                  console.log(page, limit);
                }}
              />
            </button>
          )}{" "}
          pages{" "}
          {data.count % page <= limit && (
            <button>
              <FontAwesomeIcon
                icon="arrow-right"
                onClick={() => {
                  const result = page + 1;
                  setPage(result);
                }}
              />
            </button>
          )}
   
        </span>
        <span>
          nombre d'offres par page :{" "}
          <input
            type="text"
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          />
        </span> */}
      </div>
      <div className="container">
        {data.offers.map((item, index) => {
          return (
            <Link key={index} className="offer" to={`/offer/${item._id}`}>
              <p className="user">vendeur : {item.owner.account.username}</p>
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
