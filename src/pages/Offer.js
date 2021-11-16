import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
          // `http://localhost:4000/offer/${id}`
          `https://my-vinted-api-paul.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    // console.log(data._id);
  }, [id]);

  let arr = [];
  if (data) {
    arr = Object.keys(data.product_details);
  }

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="contain-offer">
      <img src={data.product_image.secure_url} alt="" />
      <div className="details">
        <div>
          <p className="info price">{data.product_price} €</p>
          <div className="info">
            {data.product_details &&
              arr.map((item, index) => {
                return (
                  <div key={index} className="spans">
                    <span className="span1">{item}</span>
                    <span>{data.product_details[item]}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="infos">
          <p className="info">{data.product_name}</p>
          <p className="info">{data.product_description}</p>
          <Link to={`/payment/${data._id}`}>
            <button>acheter</button>
          </Link>
        </div>
        <Link to={`/payment/${data._id}`}>
          <button className="hide-it">acheter</button>
        </Link>
      </div>
    </section>
  );
};

export default Offer;
